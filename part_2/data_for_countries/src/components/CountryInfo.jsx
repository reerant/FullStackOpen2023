import WeatherInfo from "./WeatherInfo";

//show basic info and weather info for a specific country 
const CountryInfo = ({ country }) => {
  const imgStyle = {
    border: "solid",
  };
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>
        Capital: {country.capital}
        <br />
        Area: {country.area}
      </div>
      <div>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
      <div>
        <img style={imgStyle} src={country.flags.png} alt={country.flags.alt} />
      </div>
      <WeatherInfo country={country} />
    </>
  );
};

export default CountryInfo;
