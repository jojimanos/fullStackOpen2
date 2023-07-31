import axios from "axios";

const baseURL = 'http://localhost:8000/persons'

const GetNames = (setPersons) => {
    return axios.get(baseURL)
        .then(response => {
            console.log('Success');
            setPersons(response.data)
        })
}

const AddName = (newPerson) => { 
    return axios.post(baseURL, newPerson)
    .then(response =>
        console.log(response))}

const DeleteName = (id) => {
    return axios.delete(baseURL + "/" + id)
    .then(response => console.log(response))
}

// const UpdateNumber = (newName, updatedEntry, setPersons, persons) => {
    // return axios.put(baseURL + "/" + newName, updatedEntry)
    // .then(response => {
        // console.log("Success");
        // setPersons(persons.map(person => person.name === updatedEntry.name ? response.data : person))
    // })
// }

export default { GetNames, AddName, DeleteName, 
    // UpdateNumber 
}