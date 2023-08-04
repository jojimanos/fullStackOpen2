import { useEffect, useState } from "react"

const Info = ({ displayCountry, weatherInfo, weathercodeText }) => {

    //show details toggles open the details of countries when ten or more
    //are displayed
    const [showDetails, setShowDetails] = useState(displayCountry.map(d => false))

    const handleShowDetails = (i) => {
        //set true or false on every country's individual details display
        const newEntries = showDetails.map((d, index) => index === i ? !d : d)
        setShowDetails(newEntries)
    }

    useEffect(() => {
        //reinitialize the showDetails state for every country 
        setShowDetails(displayCountry.map(d => false))
    }, [displayCountry])


    return (
        <>
            {displayCountry.length > 1 ?
                (displayCountry.map((c, index) => {
                    return (
                        <div key={index}>
                            <p>
                                <span>{c.name} </span>
                                <button onClick={() => handleShowDetails(index)}>show</button>
                            </p>
                            {showDetails[index] === true ?
                                <div >
                                    <p>{c.capital}<br />
                                        {c.area}
                                    </p>
                                    <h3>Languages</h3>
                                    <ul>{Object.values(c.languages)
                                        .map((o, index) => { return <li key={index}>{o}</li> })}</ul>
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
                            <ul>{Object.values(c.languages)
                                .map((o, index) => { return <li key={index}>{o}</li> })}</ul>
                            <img src={c.flag} alt="flag" />
                            {weatherInfo ?
                                <>
                                    <h3>Weather in {c.capital}</h3>
                                    <p>Temperature: {weatherInfo.current_weather.temperature}</p>
                                    <p>Windspeed: {weatherInfo.current_weather.windspeed}</p>
                                    <p>Cloudcover: {weatherInfo.hourly.cloudcover[weatherInfo.hourly.cloudcover.length - 1]}</p>
                                    <p>Rain: {weatherInfo.hourly.rain[weatherInfo.hourly.rain.length - 1]}</p>
                                    <p>Conditions: {weathercodeText}</p>
                                </> : null
                            }
                        </div>)
                }
                )
                )
            }
        </>
    )
}

export default Info; 