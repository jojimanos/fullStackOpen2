import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/"

const getAll = (setAllCountries) => {
    const request = axios.get(baseUrl + "all")
    return request.then(response => { console.log("Success", response); 
    setAllCountries(response.data) })
}

export default {getAll}