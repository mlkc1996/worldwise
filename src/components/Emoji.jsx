const convertToEmoji = (countryCode) => {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }

  const convertToCountryCode = (emoji) => {
    return Array.from(emoji, (codeUnit) => codeUnit.codePointAt()).map(char => String.fromCharCode(char - 127397).toLowerCase()).join('')
  }


const Emoji = ({ emoji, countryCode }) => {
    if (countryCode) {
        return (<img src={`https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`} alt='flag' />);
    } else if (emoji) {
        const countryCode = convertToCountryCode(emoji)
        return (<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />);
    } else {
        return <></>
    }

};

export default Emoji;