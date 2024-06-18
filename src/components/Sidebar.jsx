import styles from './SideBar.module.css';
import Logo from "./Logo";
import AppNav from "./AppNav";
function Sidebar({ element }) {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />
            {element}
            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
                </p>
            </footer>
        </div>
    );
}

export default Sidebar;
