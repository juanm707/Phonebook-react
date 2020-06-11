import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [personsToDisplay, setPersonsToDisplay] = useState([...persons]);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.filter(person => person.name === newName).length > 0) {
      return alert(`${newName} is already added to phonebook`);
    }

    const personObject = {
      name: newName,
      number: newNumber
    };

    setPersons(persons.concat(personObject));
    setPersonsToDisplay(persons.concat(personObject));

    setNewName('');
    setNewNumber('');
    setFilter('');

  }

  const handleNewName = (event) => {
    setNewName(event.target.value);
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilter = (event) => {
    setFilter(event.target.value);
    if (event.target.value === "") {
      setPersonsToDisplay([...persons]);
    } else {
      setPersonsToDisplay(persons.filter(person => person.name.toUpperCase().includes(event.target.value.toUpperCase())));
    }
  }

  return (
    <div style={{paddingLeft:'10px'}}>
      <h2>Phonebook</h2>
      filter shown with <input value={filter} onChange={handleFilter}/>
      <form onSubmit={addPerson}>
        <h3>Add new</h3>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
          <br/>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToDisplay.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  );
}

export default App;
