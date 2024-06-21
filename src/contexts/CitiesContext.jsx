import { createContext, useCallback, useContext, useEffect, useState } from "react";
const CitiesContext = createContext();
const url = `http://localhost:8000/cities`;

export function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState(undefined);

    const loadCities = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await fetch(url);
            const data = await res.json();
            setCities(data);
        } catch {
            alert("Error loading city data");
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
        } catch {
            alert("Error loading city data");
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
            getCity
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