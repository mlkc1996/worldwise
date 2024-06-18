import Sidebar from "./../components/Sidebar";
import styles from './AppLayout.module.css';
import Map from "./../components/Map";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const url = `http://localhost:8000/cities`;


function AppLayout() {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchCities = async () => {
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
        };

        fetchCities();
    }, []);


    return (
        <div className={styles.app}>
            <Sidebar element={<Outlet context={{ cities, isLoading }} />} />
            <Map />
        </div>
    );
}

export default AppLayout;
/*
<BrowserRouter>
    <Routes>
        <Route index element={<Navigate to="cities" />} />
        <Route path="cities" element={<CityList />} />
        <Route path="countries" element={<p>
            List of countries
        </p>} />
        <Route path="form" element={<p>
            Form
        </p>} />
    </Routes>
</BrowserRouter>

*/ 