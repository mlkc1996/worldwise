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
import { useEffect, useState } from 'react';

function Map() {
    const [searchParams, setSearchParmas] = useSearchParams();
    const { cities, currentCity } = useCities();
    const navigate = useNavigate();
    const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();
    const [useGeolocationPosition, setUseGeolocationPosition] = useState(false);

    const mapLat = searchParams.get("lat") || currentCity?.position?.lat || "";
    const mapLng = searchParams.get("lng") || currentCity?.position?.lng || "";


    useEffect(() => {
        if (mapLat && mapLng) {
            return;
        }

        if (!geolocationPosition) {
            return;
        }

        const { lat, lng } = geolocationPosition;

        if (useGeolocationPosition && (lat != mapLat || lng != mapLng)) {
            navigate(`form?lat=${lat}&lng=${lng}`);
        }

    }, [geolocationPosition, navigate, mapLat, mapLng, useGeolocationPosition]);

    const onUseGeolocation = () => {
        getPosition();
        setUseGeolocationPosition(true);
    };

    return (
        <div id="map" className={styles.mapContainer}>
            {
                !useGeolocationPosition && <Button type="position" onClick={onUseGeolocation}>{
                    isLoadingPosition ? "Loading ..." : "Use your position"
                }</Button>
            }
            <MapContainer center={[mapLat, mapLng]} zoom={6} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities && cities.map((city) => {
                    const { position, id } = city;
                    const { lat, lng } = position ?? {};
                    if (!position) {
                        console.log(city);
                    }
                    return (<Marker position={[lat, lng]} key={id}
                        eventHandlers={{
                            click() {
                                navigate(`cities/${id}?lat=${lat}&lng=${lng}`);
                                setUseGeolocationPosition(false);
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
                <ChangeCenter position={[mapLat, mapLng]} />
                <DetectClick onClick={() => {
                    setUseGeolocationPosition(false);
                }} />
            </MapContainer>
        </div>
    );
}


function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick({ onClick }) {
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

            if (typeof onClick === "function") {
                onClick(e);
            }
        },
    });
}

export default Map;
