const AddPersonForm = ({
  addPerson,
  newName,
  handleNewName,
  newNumber,
  handleNewNumber,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name:
        <input value={newName} onChange={handleNewName} />
      </div>
      <div>
        Number:
        <input value={newNumber} onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default AddPersonForm;
