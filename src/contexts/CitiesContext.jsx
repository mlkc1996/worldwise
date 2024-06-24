import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
const CitiesContext = createContext();
const url = `http://localhost:8000/cities`;

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: null,
    cityListUpToDate: false,
    error: ""
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                isLoading: true,
                error: "",
            };
        case 'cities/loaded':
            return {
                ...state,
                isLoading: false,
                cities: action.payload,
                cityListUpToDate: true
            };
        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload,
            };
        case 'city/created':
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload,
                cityListUpToDate: false
            };
        case 'city/deleted': {
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload === null ? null : state.currentCity,
                cityListUpToDate: false
            };
        }
        case 'rejected': {
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        }
        default:
            throw new Error("Unknown action type");
    }
};

export function CitiesProvider({ children }) {

    const [{
        cities,
        isLoading,
        currentCity,
        cityListUpToDate,
        error
    }, dispatch] = useReducer(reducer, initialState);

    const loadCities = useCallback(async () => {
        try {
            dispatch({ type: "loading" });
            const res = await fetch(url);
            const data = await res.json();
            dispatch({ type: 'cities/loaded', payload: data });
        } catch (err) {
            console.log("Error in loading cities data");
            dispatch({ type: 'rejected', payload: err.message });
        }
    }, []);

    const getCity = useCallback(async (id) => {
        try {
            if (id == currentCity?.id) {
                return;
            }

            dispatch({ type: "loading" });
            const res = await fetch(`${url}/${id}`);
            const data = await res.json();
            dispatch({ type: 'city/loaded', payload: data });
        } catch (err) {
            console.log("Error in loading city data");
            dispatch({ type: 'rejected', payload: err.message });
        }
    }, [currentCity?.id]);


    const createCity = useCallback(async (newCity) => {
        try {
            dispatch({ type: "loading" });
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            dispatch({ type: 'city/created', payload: data });
        } catch (err) {
            console.log("Error in saving city data");
            dispatch({ type: 'rejected', payload: err.message });
        }
    }, []);

    const deleteCity = useCallback(async (id) => {
        try {
            dispatch({ type: "loading" });
            const res = await fetch(`${url}/${id}`, {
                method: "DELETE",
            });
            await res.json();
            let payload = undefined;
            if (currentCity?.id === id) {
                payload = null;
            }
            dispatch({ type: 'city/deleted', payload });
        } catch (err) {
            console.log("Error in deleting a city");
            dispatch({ type: 'rejected', payload: err.message });
        }
    }, [currentCity?.id]);

    useEffect(() => {
        loadCities();
    }, [loadCities]);

    const value = useMemo(() => {
        return {
            cities,
            isLoading,
            loadCities,
            currentCity,
            getCity,
            createCity,
            cityListUpToDate,
            deleteCity,
            error
        };
    }, [cities, isLoading, loadCities, currentCity, getCity, createCity, cityListUpToDate, deleteCity, error]);

    return <CitiesContext.Provider
        value={value}
    >
        {children}
    </CitiesContext.Provider>;
}


export function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) {
        throw new Error("The CitiesContextProvider is out of scope. Please check the component tree.");
    }
    return context;
}