const Numbers = ({persons}) => {
    return (
        <>
            <h2>Numbers</h2>
            {persons.map((person, index) => { return <p key={index}>{person.name} {person.number}</p> })}
        </>
    )
}

export default Numbers;