import axios from "axios";

const getInformation = (capitalLocation, setWeatherInfo) => {
    const latitude = capitalLocation[0][0]
    const longitude = capitalLocation[0][1]
    const request = axios
            .get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&current_weather=true&hourly=cloudcover,rain,weathercode,is_day&daily=temperature_2m_max,temperature_2m_min,rain_sum,precipitation_probability_mean,weathercode`)
    return request.then(response => { console.log(response); setWeatherInfo(response.data) })
}

export default { getInformation }