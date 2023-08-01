import axios from "axios";

const baseURL = 'http://localhost:8000/persons'

const GetNames = (setPersons) => {
    const request = axios.get(baseURL)
    return request.then(response => {
        console.log('Success');
        setPersons(response.data)
    })
}

const AddName = (newPerson) => {
    const request = axios.post(baseURL, newPerson)
    return request.then(response =>
        console.log(response))
}

const DeleteName = (id) => {
    const request = axios.delete(baseURL + "/" + id)
    return request.then(response => console.log(response))
}

const UpdateNumber = (updatedEntry, setPersons, persons) => {
    const request = axios.put(baseURL + "/" + updatedEntry.id, updatedEntry)
    return request.then(response => {
        console.log("Success", response);
        setPersons(persons.map(person => person.name === updatedEntry.name ? response.data : person))
    })
}

export default { GetNames, AddName, DeleteName, UpdateNumber }