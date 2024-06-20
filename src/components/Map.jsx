import styles from './Map.module.css';
import { useSearchParams, useNavigate } from 'react-router-dom';


function Map() {
    const [searchParams, setSearchParmas] = useSearchParams();
    const navigate = useNavigate();

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return (
        <div className={styles.mapContainer}>

        </div>
    );
}

export default Map;
