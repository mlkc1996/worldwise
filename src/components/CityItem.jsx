import styles from './CityItem.module.css';
import { Link } from "react-router-dom";
import { useCities } from '../contexts/CitiesContext';
import Emoji from "./Emoji";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

function CityItem({ city }) {
    const { currentCity, deleteCity } = useCities();
    const { id, cityName, emoji, date, position: { lat, lng } } = city;


    const deleterCityHandler = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await deleteCity(id)
    }

    return (
        <li >
            <Link to={`${id}?lat=${lat}&lng=${lng}`} className={`${styles.cityItem} ${currentCity?.id === id ? styles['cityItem--active'] : ''}`}>
                <span className={styles.emoji}>
                    <Emoji emoji={emoji} />
                </span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>({formatDate(date)})</time>
                <button className={styles.deleteBtn} onClick={deleterCityHandler}>&times;</button>
            </Link>
        </li>
    );
}

export default CityItem;
