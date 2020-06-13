import React, {useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const Filter = ({filter, onChange}) => {

  return (
      <div>
        <p>filter shown with</p><input value={filter} onChange={onChange}/>
      </div>
  );
}

const PersonForm = (props) => {

  return (
      <div>
        <form onSubmit={props.onSubmit}>
          <div>
            name: <input value={props.newName} onChange={props.onNameChange}/>
            <br/>
            number: <input value={props.newNumber} onChange={props.onNumberChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
  );
}

const Persons = (props) => {
  return (
      <div>
        {props.personsToDisplay.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
  );
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [personsToDisplay, setPersonsToDisplay] = useState([...persons]);

  const hook = () => {
    axios
        .get('http://localhost:3001/persons')
        .then(response => {
          setPersons(response.data);
          setPersonsToDisplay(response.data);
        });
  };

  useEffect(hook, []);

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
      <Filter filter={filter} onChange={handleFilter}/>
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} newName={newName} newNumber={newNumber} onNameChange={handleNewName} onNumberChange={handleNewNumber}/>
      <h3>Numbers</h3>
      <Persons personsToDisplay={personsToDisplay}/>
    </div>
  );
}

export default App;
