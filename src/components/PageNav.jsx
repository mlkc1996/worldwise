import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
const addActive = ({ isActive }) => {
    return isActive ? styles.active : "";
};
function PageNav() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink to="/" className={addActive}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/product" className={addActive}>
                        Product
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/pricing" className={addActive}>
                        Pricing
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default PageNav;
