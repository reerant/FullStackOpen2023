const Person = ({ name, number, deletePerson, id }) => {
  return (
    <tbody>
      <tr>
        <td>
          {name} {number}
        </td>
        <td>
          <button onClick={() => deletePerson(id, name)}> delete </button>
        </td>
      </tr>
    </tbody>
  );
};

export default Person;
