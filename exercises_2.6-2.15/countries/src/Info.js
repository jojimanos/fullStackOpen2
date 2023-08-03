import { useState } from "react"

const Info = ({ displayCountry }) => {

    const [showDetails, setShowDetails] = useState(displayCountry.map(d => false))

    const handleShowDetails = (i) => {
        console.log("Here is the index", i)
        const newEntries = showDetails.map((d, index) => index === i ? !d : d)
        setShowDetails(newEntries)
    }

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
                                    <ul>{Object.values(c.languages).map((o, index) => {return <li key={index}>{o}</li>})}</ul>
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
                        </div>)
                }
                )
                )
            }
        </>
    )
}

export default Info; 