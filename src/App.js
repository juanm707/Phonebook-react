import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [persons, setPerson] = useState([
    { name: 'Arto Hellas'}
  ]);
  const [newName, setNewName] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName
    };

    setPerson(persons.concat(personObject));
    setNewName('');

  }

  const handleNewName = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div style={{paddingLeft:'10px'}}>
      <div>debug newName: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  );
}

export default App;
