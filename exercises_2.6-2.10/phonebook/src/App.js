import { useState, useEffect } from 'react'
import InputForm from './InputForm'
import SearchBar from './SearchBar'
import Numbers from './Numbers'
import services from './services'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [updater, setUpdater] = useState(false)

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

    services.AddName(newPerson)

    setPersons([...persons, newPerson]);
    setNewName('');
    setNewNumber('')
    excludeDuplicates = ""
    console.log(persons)
  }

  const handleDelete = (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this user?")
    if (confirmation) {
      services.DeleteName(id)
    }
    setUpdater(!updater)
  }

  // const handleUpdateNumber = () => {
    // const updatedEntry = {
      // name: newName,
      // number: newNumber,
    // }
// 
    // services.UpdateNumber(newName, updatedEntry, setPersons, persons)
  // }

  let searchPerson = persons.filter((person) => person.name.toLowerCase() === searchName.toLowerCase())

  console.log(persons, searchPerson)

  useEffect(() => {
    services.GetNames(setPersons)
  }, [updater])

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <SearchBar searchName={searchName} setSearchName={setSearchName} searchPerson={searchPerson} />
        <InputForm newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} handleSubmit={
          // persons.map((person) => {return person.name === newName}) ? handleUpdateNumber : 
          handleSubmit} />
        <Numbers persons={persons} handleDelete={handleDelete}/>
      </div>
    </div>
  )
}

export default App