// several countries listed -> button to show more info of a specific country
const CountryName = ({ countryName, showInfo }) => {
  return (
    <tbody>
      <tr>
        <td>{countryName}</td>
        <td>
          <button onClick={() => showInfo({ countryName })}>show</button>
        </td>
      </tr>
    </tbody>
  );
};

export default CountryName;
