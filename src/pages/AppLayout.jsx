import Sidebar from "./../components/Sidebar";
import styles from './AppLayout.module.css';
import Map from "./../components/Map";
import User from "./../components/User";
import { useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

function AppLayout() {
    const { authenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authenticated) {
            navigate("/login");
        }

    }, [authenticated, navigate]);


    return (
        <div className={styles.app}>
            <Sidebar />
            {authenticated && <User />}
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