import Input from "./Input"
import { useEffect, useState } from "react";
import axios from "axios";
import Info from "./Info";
import services from "./services"

function App() {

  const [countryValue, setCounrtyValue] = useState("")
  const [displayCountry, setDisplayCountry] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [newEntry, setNewEntry] = useState([])

  const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api/name/${countryValue}`

  useEffect(() => {
    services.getAll(setAllCountries);
  }, [])

  useEffect(() => {
    if (countryValue.length !== 0)
      setNewEntry(allCountries.find(country => { return country.name.common.toLowerCase().includes(countryValue.toLowerCase()) }))
      console.log(newEntry)
  }, [newEntry])

  useEffect(() => {
    // if (displayCountry.includes(newEntry) !== true)
      setDisplayCountry([...displayCountry, newEntry])
  }, [countryValue])

  console.log(allCountries)
  console.log(displayCountry)
  console.log("New entry here", newEntry)

  return (
    <>
      <Input text={"Find countries "} setCountryValue={setCounrtyValue} />
      {/* <Info displayCountry={displayCountry}/> */}
    </>
  );
}

export default App;