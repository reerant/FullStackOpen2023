import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import FilteredCountries from "./components/FilteredCountries";

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const showInfo = ({ countryName }) => {
    setSearch(countryName);
  };

  return (
    <>
      <Search search={search} handleSearch={handleSearch} />
      <FilteredCountries
        search={search}
        countries={countries}
        showInfo={showInfo}
      />
    </>
  );
};

export default App;
