import { MapContainer } from 'react-leaflet/MapContainer';
import { Marker } from 'react-leaflet/Marker';
import { TileLayer } from 'react-leaflet/TileLayer';
import { Popup } from 'react-leaflet/Popup';
import styles from './Map.module.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCities } from "./../contexts/CitiesContext";
import Emoji from "./Emoji";
import { useMap, useMapEvents } from 'react-leaflet';
import { useGeolocation } from "./../hooks/useGeolocation";
import Button from "./Button";
import { useEffect } from 'react';

function Map() {
    const [searchParams, setSearchParmas] = useSearchParams();
    const { cities, currentCity } = useCities();
    const navigate = useNavigate();
    const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();

    const lat = searchParams.get("lat") || currentCity?.position?.lat || "";
    const lng = searchParams.get("lng") || currentCity?.position?.lng || "";

    useEffect(() => {
        if (!geolocationPosition) {
            return;
        }

        const { lat, lng } = geolocationPosition;

        navigate(`form?lat=${lat}&lng=${lng}`);

    }, [geolocationPosition, navigate]);


    return (
        <div id="map" className={styles.mapContainer}>
            {
                !geolocationPosition && <Button type="position" onClick={getPosition}>{
                    isLoadingPosition ? "Loading ..." : "Use your position"
                }</Button>
            }
            <MapContainer center={[lat, lng]} zoom={6} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities && cities.map((city) => {
                    const { position, id } = city;
                    const { lat, lng } = position ?? {}
                    if (!position) {
                        console.log(city)
                    }
                    return (<Marker position={[lat, lng]} key={id}
                        eventHandlers={{
                            click() {
                                navigate(`cities/${id}?lat=${lat}&lng=${lng}`);
                            }
                        }}
                    >
                        <Popup>
                            <span>
                                <Emoji emoji={city.emoji} />
                            </span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>);
                })}
                <ChangeCenter position={[lat, lng]} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}


function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
        click(e) {
            const { latlng } = e || {};
            const { lat, lng } = latlng || {};
            let query_string = "";

            if (lat && lng) {
                query_string = `?lat=${lat}&lng=${lng}`;
            }
            navigate(`form${query_string}`);
        },
    });
}

export default Map;
