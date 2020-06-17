import React, {useState, useEffect } from 'react';
import './App.css';
import personService from './services/person';

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
    console.log(props.personsToDisplay);
  return (
      <div>
        {props.personsToDisplay.map(person => {
            console.log('In Persons', person);
            return (
                <div key={person.id}>
                    <p key={person.name}>{person.name} {person.number} <button onClick={() => props.onDelete(person)}>delete</button></p>
                </div>
            );
        })}
      </div>
  );
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [personsToDisplay, setPersonsToDisplay] = useState([...persons]);

  useEffect(() => {
      personService
          .getAll()
          .then(initialPersons => {
              setPersons(initialPersons);
              setPersonsToDisplay(initialPersons);
          });
  }, []);

  // getAll
  // const hook = () => {
  //   axios
  //       .get('http://localhost:3001/persons')
  //       .then(response => {
  //         setPersons(response.data);
  //         setPersonsToDisplay(response.data);
  //       });
  // };

  // useEffect(hook, []);

  const addPerson = (event) => {
      event.preventDefault();

      const newPerson = persons.filter(person => person.name === newName);
      if (newPerson.length > 0) {
          if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
              const updatedPerson = {...newPerson[0], number: newNumber};
              personService
                  .update(updatedPerson.id, updatedPerson)
                  .then(returnedPerson => {
                      const newPersons = persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson);
                      
                      setPersons(newPersons);
                      setPersonsToDisplay([...newPersons]);
                      setNewName('');
                      setNewNumber('');
                      setFilter('');
                  })
          }
      } else {

          const personObject = {
              name: newName,
              number: newNumber
          };

          personService
              .create(personObject)
              .then(returnedPerson => {
                  setPersons(persons.concat(returnedPerson));
                  setPersonsToDisplay(persons.concat(returnedPerson));
                  setNewName('');
                  setNewNumber('');
                  setFilter('');
              });
      }
  }

  const deletePerson = (person) => {
      console.log('In deletePerson', person);
      if (window.confirm(`Delete ${person.name}?`)) {
          personService
              .erase(person.id)
              .then(() => {
                  let newPersons = persons.filter(p1 => {
                      return p1.id !== person.id;
                  });
                  console.log('newPersons', newPersons);
                  setPersons(newPersons);
                  setPersonsToDisplay([...newPersons]);
              })
              .catch(error => alert(error));
      } else {}
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
      <Persons personsToDisplay={personsToDisplay} onDelete={deletePerson}/>
    </div>
  );
}

export default App;
