import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

const addActive = ({ isActive }) => {
    return isActive ? styles.active : "";
};
function PageNav() {
    return (
        <nav className={styles.nav}>
            <Logo />
            <ul>
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
                <li>
                    <NavLink to="/login" className={styles.ctaLink}>
                        Login
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default PageNav;
