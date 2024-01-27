import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";
import Search from "./components/Search";
import AddPersonForm from "./components/AddPersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notificationMsg, setNotificationMsg] = useState(null);
  const [timeoutId, setTimeoutId] = useState();
  const [errorMsg, setErrorMsg] = useState(null);

  // show all contacts from phonebook list
  useEffect(() => {
    phonebookService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((e) => {
        setErrorNotification(
          `Request failure. Unable to fetch data from the server.`
        );
      });
  }, []);

  // add new contact to phonebook list
  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    //check for already existing names
    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    // if contact already exists check if number needs to be updated
    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to the Phonebook. Do you want to replace the old number with a new one?`
        )
      ) {
        phonebookService
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
            setNotification(
              `Updated number for ${existingPerson.name}: ${newNumber}.`
            );
          })
          .catch((e) => {
            setErrorNotification(
              `Failed to update. Information of ${existingPerson.name} has already been deleted from the server.`
            );
            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            );
          });
      }

      // create new contact
    } else {
      phonebookService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotification(`Added ${returnedPerson.name} to the Phonebook.`);
        })
        .catch((e) => {
          setErrorNotification(`Unable to add new contact to the Phonebook.`);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  //delete person from the phonebook list
  const deletePerson = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}?`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification(`Removed ${name} from the Phonebook.`);
        })
        .catch((e) => {
          setErrorNotification(`Unable to delete ${name} from the Phonebook.`);
        });
    }
  };

  // show notification for user actions: add, update number, delete
  const setNotification = (msg) => {
    setNotificationMsg(msg);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutID = setTimeout(() => {
      setNotificationMsg(null);
    }, 3000);
    setTimeoutId(newTimeoutID);
  };

  //show error notification for failed actions/requests
  const setErrorNotification = (errorMsg) => {
    setErrorMsg(errorMsg);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutID = setTimeout(() => {
      setErrorMsg(null);
    }, 3000);
    setTimeoutId(newTimeoutID);
  };
  const handleNewName = (e) => {
    setNewName(e.target.value);
  };
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notificationMsg={notificationMsg} errorMsg={errorMsg} />
      <Search search={search} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <AddPersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} deletePerson={deletePerson} />
    </div>
  );
};
export default App;
