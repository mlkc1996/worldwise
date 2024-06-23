import { createContext, useCallback, useContext, useEffect, useState } from "react";
const CitiesContext = createContext();
const url = `http://localhost:8000/cities`;

export function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState(undefined);
    const [cityListUpToDate, setCityListUpToDate] = useState(false)

    const loadCities = useCallback(async () => {
        try {
           setIsLoading(true);
            const res = await fetch(url);
            const data = await res.json();
            setCities(data);
            setCityListUpToDate(true)
        } catch(err) {
            console.log("Error in loading cities data");
            throw err
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getCity = useCallback(async (id) => {
        try {
           setIsLoading(true);
            const res = await fetch(`${url}/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch(err) {
            console.log("Error in loading city data");
            throw err
        } finally {
            setIsLoading(false);
        }
    }, []);


    const createCity = useCallback(async (newCity) => {
        try {
           setIsLoading(true);
            const res = await fetch(url, {
                method:"POST",
                body:JSON.stringify(newCity),
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const data = await res.json();
            setCurrentCity(data);
            setCityListUpToDate(false)
        } catch(err) {
            console.log("Error in saving city data");
            throw err
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteCity = useCallback(async (id) => {
        try {
           setIsLoading(true);
            const res = await fetch(`${url}/${id}`, {
                method:"DELETE",
            });
            await res.json();
            if (currentCity?.id === id) {
                setCurrentCity(null);
            }
            setCityListUpToDate(false)
        } catch(err) {
            console.log("Error in deleting a city");
            throw err
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCities();
    }, [loadCities]);

    return <CitiesContext.Provider
        value={{
            cities,
            isLoading,
            loadCities,
            currentCity,
            getCity,
            createCity,
            cityListUpToDate,
            deleteCity
        }}
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