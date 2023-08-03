const Input = ({ text, setCountryValue }) => {
    return (
        <>
            <p>{text}<input placeholder="type a country" onChange={(e) => {setCountryValue(e.target.value)}}/></p>
        </>
    )
}

export default Input;