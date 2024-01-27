import CountryName from "./CountryName";
import CountryInfo from "./CountryInfo";


// search for countries by name
const FilteredCountries = ({ countries, search, showInfo }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  if (!search) {
    return null;
  }
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another search criteria.</p>;
  }

  if (filteredCountries.length > 1) {
    return (
      <div>
        <table>
          {filteredCountries.map((country) => (
            <CountryName
              key={country.name.common}
              id={country.name.common}
              showInfo={showInfo}
              countryName={country.name.common}
            />
          ))}
        </table>
      </div>
    );
  }

  return (
    <>
      {filteredCountries.map((country) => (
        <CountryInfo
          key={country.name.common}
          id={country.name.common}
          country={country}
        />
      ))}
    </>
  );
};

export default FilteredCountries;
