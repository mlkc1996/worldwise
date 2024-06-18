import styles from './CityList.module.css';
import { useOutletContext } from "react-router-dom";
import Spinner from "./Spinner";
import CityItem from './CityItem';
import Message from "./Message";


function CityList() {
    const { cities, isLoading } = useOutletContext();

    if (isLoading) {
        return <Spinner />;
    }

    if (!cities?.length) {
        return <Message message="Add your first city by clicking on a city on the map" />;
    }

    return (
        <ul className={styles.cityList}>
            {cities.map((city) => {
                return <CityItem key={city.id} city={city} />;
            })}
        </ul>
    );
}

export default CityList;
