import Input from "./Input"
import { useEffect, useState } from "react";
import Info from "./Info";
//fetch all countries data
import services from "./services"
//fetch weather information on country's capital
import weatherService from "./weatherService";

function App() {

  //country value is the input, display country are the countries or country that 
  //matches the search terms. They display only if they are less ten or less.
  //all countries is the array of fetched data for all countries
  //new country is for state upadate, adding and deleting countries from the
  //display country array
  const [countryValue, setCounrtyValue] = useState("")
  const [displayCountry, setDisplayCountry] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [newEntry, setNewEntry] = useState([])

  //capital location is the array that contains anly the individual latitude and
  //and longitude of each capital.
  //weatherinfo is fetched from the open meteo api, then weathercode is extracted
  //and decrypted for text display
  const [capitalLocation, setCapitalLocation] = useState([])
  const [weatherInfo, setWeatherInfo] = useState([])
  const [weathercode, setWeathercode] = useState()
  const [weathercodeText, setWeathercodeText] = useState("")

  useEffect(() => {
    //get all countries data
    services.getAll(setAllCountries);
  }, [])

  useEffect(() => {
    //search logic
    if (countryValue.length !== 0)
      setNewEntry(allCountries.filter(country => { return country.name.common.toLowerCase().includes(countryValue.toLowerCase()) }))
    else if (countryValue.length === 0) { setNewEntry([]) }
  }, [countryValue])

  useEffect(() => {
    //display countries that match the search
    if (displayCountry.includes(newEntry) !== true)
      setDisplayCountry(newEntry)
  }, [newEntry])

  useEffect(() => {
    //extract the location of the capital
    setCapitalLocation(displayCountry.map(d => d.capitalInfo.latlng));
    if (capitalLocation.length !== 0) {
      weatherService.getInformation(capitalLocation, setWeatherInfo)
    }
  }, [newEntry])

  useEffect(() => {
    //get the weathercode
    if (weatherInfo.length !== 0) {
      let newWeatherCode = weatherInfo.hourly.weathercode[weatherInfo.hourly.weathercode.length - 1]
      setWeathercode(newWeatherCode);
    }
  }, [weatherInfo])

  useEffect(() => {
    //turn the weather code to text
    if (weathercode === 0) {
      let newWeatherCodeText = "Clear sky"
      setWeathercodeText(newWeatherCodeText)
    } else if (weathercode === 1) {
      let newWeatherCodeText = "Clear sky"
      setWeathercodeText(newWeatherCodeText)
    }
  }, [weatherInfo])

  //Use the following console.logs to check the state values. 

  // console.log("All countries fetched", allCountries)
  // console.log("Display countries", displayCountry)
  // console.log("New entry here", newEntry)
  // console.log("Display country from info component", displayCountry)
  // console.log("Capital's location", capitalLocation)
  // console.log("Weather Info", weatherInfo)
  // console.log("Weathercode for capital", weathercode)
  // console.log("Text interpretation of weathercode", weathercodeText)

  return (
    <>
      <Input text={"Find countries "} setCountryValue={setCounrtyValue} />
      {displayCountry.length === 0 ? <p>Insert data</p> :
        (
          displayCountry.length === 1 ?
            <Info
              weatherInfo={weatherInfo}
              weathercode={weathercode}
              weathercodeText={weathercodeText}
              displayCountry={displayCountry
                .map(c => (
                  {
                    name: c.name.common,
                    capital: c.capital,
                    area: c.area,
                    flag: c.flags.png,
                    languages: c.languages,
                    capitalLocation: c.capitalInfo.latlng
                  }))} /> :
            (
              displayCountry.length > 10 ?
                <p>Make the query more specific</p> :
                <Info
                  displayCountry={displayCountry
                    .map(c => (
                      {
                        name: c.name.common,
                        capital: c.capital,
                        area: c.area,
                        flag: c.flags.png,
                        languages: c.languages
                      }))} />
            )
        )
      }
    </>
  );
}

export default App;
