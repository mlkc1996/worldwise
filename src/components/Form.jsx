// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import ButtonBack from "./ButtonBack";
import UseUrlPosition from "../hooks/useUrlPosition";
import Emoji from "./Emoji";
import Message from "./Message";
import Spinner from "./Spinner";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = UseUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState(null);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [geocodingError, setGeoCodingError] = useState("");
  const [created, setCreated] = useState(false);
  const { position: geolocationPosition } = useGeolocation();


  const {
    createCity,
    isLoading: useCitiesLoading,
  } = useCities();


  const fetchCityData = useCallback(async (lat, lng) => {
    try {
      setGeoCodingError("");
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
      const data = await res.json();
      if (!data?.countryCode) {
        throw new Error("That doesn't seem to be a city. Click somewhere else.");
      }
      setCityName(data.city || data.locality || "");
      setCountry({
        name: data.countryName || "",
        code: data.countryCode || ""
      });
    } catch (err) {
      setGeoCodingError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (created) {
      navigate(`/app/cities`);
      return;
    }

    if (lat && lng) {
      fetchCityData(lat, lng);
    }
  }, [lat, lng, fetchCityData, created, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!cityName || !date) {
      return;
    }

    const newCity = {
      cityName,
      country: country.name,
      date: date.toISOString(),
      notes,
      emoji: convertToEmoji(country.code),
      position: {
        lat: +lat,
        lng: +lng
      }
    };

    try {
      await createCity(newCity);
      setCreated(true);
    } catch (err) {
      alert(err.message);
    }
  };


  if (!lat && !lng) {
    return <Message message='Start by clicking somewhere on the map' />;
  }

  if (geocodingError) {
    return <Message message={geocodingError} />;
  }

  if (isLoading) {
    return <Spinner />;
  }


  return (
    <form className={`${styles.form} ${useCitiesLoading ? styles.loading : ''}`} >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>
          <Emoji countryCode={country?.code} />
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date} onChange={(date) => setDate(date)} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={onSubmitHandler}>Add</Button>
        <ButtonBack onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }} />
      </div>
    </form>
  );
}

export default Form;
