import Person from "./Person";

const Persons = ({ persons, search, deletePerson }) => {
  return (
    <table>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((person) => (
          <Person
            key={person.id}
            id={person.id}
            name={person.name}
            number={person.number}
            deletePerson={deletePerson}
          />
        ))}
    </table>
  );
};

export default Persons;
