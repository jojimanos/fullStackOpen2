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
      setNewEntry(allCountries.filter(country => { return country.name.common.toLowerCase().includes(countryValue.toLowerCase()) }))
    else if (countryValue.length === 0) { setNewEntry([]) }
    // console.log(newEntry)
  }, [countryValue])

  useEffect(() => {
    if (displayCountry.includes(newEntry) !== true)
      setDisplayCountry(newEntry)
  }, [newEntry])

  console.log(allCountries)
  console.log("Display countries", displayCountry)
  console.log("New entry here", newEntry)

  return (
    <>
      <Input text={"Find countries "} setCountryValue={setCounrtyValue} />
      {displayCountry.length === 0 ? <p>Insert data</p> :
        (
          displayCountry.length === 1 ? <Info displayCountry={displayCountry.map(c => ({ name: c.name.common, capital: c.capital, area: c.area, flag: c.flags.png, languages: c.languages, capitalLocation: c.capitalInfo.latlng }))} /> :
            (
              displayCountry.length > 10 ? <p>Make the query more specific</p> : <Info displayCountry={displayCountry.map(c => ({ name: c.name.common, capital: c.capital, area: c.area, flag: c.flags.png, languages: c.languages }))} />
            )
        )
      }
    </>
  );
}

export default App;
