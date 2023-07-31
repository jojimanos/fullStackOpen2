import { useState, useEffect } from 'react'
import InputForm from './InputForm'
import SearchBar from './SearchBar'
import Numbers from './Numbers'
import axios from 'axios'

const App = () => {


  useEffect(() => {
    axios.get('http://localhost:8000/persons')
      .then(response => {
        console.log('Success');
        setPersons(response.data)
      })
  }, [])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();

    let excludeDuplicates = persons.filter(person => person.name === newName)

    if (excludeDuplicates.length)
      return window.alert(`${newName} is already on phonebook`)

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons([...persons, newPerson]);
    setNewName('');
    setNewNumber('')
    excludeDuplicates = ""
    console.log(persons)
  }

  let searchPerson = persons.filter((person) => person.name.toLowerCase() === searchName.toLowerCase())

  console.log(persons, searchPerson)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <SearchBar searchName={searchName} setSearchName={setSearchName} searchPerson={searchPerson} />
        <InputForm newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} handleSubmit={handleSubmit} />
        <Numbers persons={persons} />
      </div>
    </div>
  )
}

export default App