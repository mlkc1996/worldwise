import styles from './CountryList.module.css';
import { useOutletContext } from 'react-router-dom';
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

function CountryList() {
    const { cities, isLoading } = useOutletContext();
    const countries_set = new Set();
    const countries = [];
    cities?.forEach((city) => {
        const { country, emoji } = city;

        if (countries_set.has(country)) {
            return;
        }
        countries_set.add(country);
        countries.push({
            emoji,
            country
        });
    });

    if (isLoading) {
        return <Spinner />;
    }

    if (!cities?.length) {
        return <Message message="Add your first city by clicking on a city on the map" />;
    }
    return (
        <ul className={styles.countryList}>
            {countries.map((country) => {
                return <CountryItem key={country.country} country={country} />;
            })}
        </ul>
    );
}

export default CountryList;
