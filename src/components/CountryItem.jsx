import styles from "./CountryItem.module.css";
import Emoji from "./Emoji";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span >
        <Emoji emoji={country.emoji} />
      </span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
