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
  const [entryMode, setEntryMode] = useState("update")

  const handleSubmitName = (event) => {
    event.preventDefault();

    let excludeDuplicates = persons.filter(person => person.name === newName)

    if (excludeDuplicates.length) {
      const confirmation = window.confirm(`${newName} already exists. Replace the old naumber?`)
      const entryToUpdate = persons.find(person => person.name === newName)
      const updatedEntry = {
        ...entryToUpdate,
        number: newNumber,
      }

      console.log(updatedEntry)
      if (confirmation) {
        services.UpdateNumber(updatedEntry, setPersons, persons)
      }
    } else {

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
  }

  const handleDelete = (id) => {
    setUpdater(false)
    const confirmation = window.confirm("Are you sure you want to delete this user?")
    if (confirmation) {
      services.DeleteName(id);
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  let searchPerson = persons.filter((person) => person.name.toLowerCase() === searchName.toLowerCase())

  console.log(persons, searchPerson)

  useEffect(() => {
    services.GetNames(setPersons)
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <SearchBar searchName={searchName} setSearchName={setSearchName} searchPerson={searchPerson} />
        <InputForm newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} handleSubmit={
          handleSubmitName
        }
          persons={persons} setEntryMode={setEntryMode} />
        <Numbers persons={persons} handleDelete={handleDelete} setPersons={setPersons} />
      </div>
    </div>
  )
}

export default App