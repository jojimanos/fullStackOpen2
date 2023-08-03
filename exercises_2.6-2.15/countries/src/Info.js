import { useEffect, useState } from "react"
import weatherService from "./weatherService"

const Info = ({ displayCountry }) => {

    const [showDetails, setShowDetails] = useState(displayCountry.map(d => false))
    const [capitalLocation, setCapitalLocation] = useState()
    const [weatherInfo, setWeatherInfo] = useState()

    const handleShowDetails = (i) => {
        console.log("Here is the index", i)
        const newEntries = showDetails.map((d, index) => index === i ? !d : d)
        setShowDetails(newEntries)
    }

    useEffect(() => {
        setShowDetails(displayCountry.map(d => false))
    }, [displayCountry])

    useEffect(() => {
        if (displayCountry.length === 1)
        {setCapitalLocation(displayCountry.map(d => d.capitalLocation))}
        if (capitalLocation) 
        {weatherService.getInformation(capitalLocation, setWeatherInfo)}
    }, [displayCountry])

    console.log(showDetails)

    return (
        <>
            {displayCountry.length > 1 ?
                (displayCountry.map((c, index) => {
                    return (
                        <div key={index}>
                            <p><span>{c.name} </span><button onClick={() => handleShowDetails(index)}>show</button></p>
                            {showDetails[index] === true ?
                                <div >
                                    <p>{c.capital}<br />
                                        {c.area}
                                    </p>
                                    <h3>Languages</h3>
                                    <ul>{Object.values(c.languages).map((o, index) => { return <li key={index}>{o}</li> })}</ul>
                                    <img src={c.flag} alt="flag" />
                                </div>
                                : null}
                        </div>
                    )
                })) : (displayCountry.map((c, index) => {
                    return (
                        <div key={index}>
                            <h2>{c.name}</h2>
                            <p>{c.capital}<br />
                                {c.area}
                            </p>
                            <h3>Languages</h3>
                            <ul>{Object.values(c.languages).map((o, index) => { return <li key={index}>{o}</li> })}</ul>
                            <img src={c.flag} alt="flag" />
                            <h3>Weather in {c.capital}</h3>
                            <p>Temperature: {weatherInfo.current_weather.temperature}</p>
                            <p>Windspeed: {weatherInfo.current_weather.windspeed}</p>
                            <p>Cloudcover: {weatherInfo.hourly.cloudcover[weatherInfo.hourly.cloudcover.length - 1]}</p>
                            <p>Rain: {weatherInfo.hourly.rain[weatherInfo.hourly.rain.length - 1]}</p>
                            <p>Conditions: {weatherInfo.hourly.weathercode[weatherInfo.hourly.weathercode.length - 1]}</p>
                        </div>)
                }
                )
                )
            }
        </>
    )
}

export default Info; 