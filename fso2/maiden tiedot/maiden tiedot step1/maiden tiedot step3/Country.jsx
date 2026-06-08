import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (!city) return

    const api_key = import.meta.env.VITE_WEATHER_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`

    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.error('Failed to load weather:', error)
        setWeather(null)
      })
  }, [city])

  if (!weather) {
    return null
  }

  const iconCode = weather.weather?.[0]?.icon
  const iconUrl = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    : null

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>temperature {weather.main.temp} Celsius</p>
      {iconUrl && (
        <img src={iconUrl} alt={weather.weather[0].description} />
      )}
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

const Country = ({ country }) => {
  const capital = country.capital?.[0]

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {capital}</p>
      <p>area {country.area}</p>

      <h3>languages</h3>
      <ul>
        {Object.values(country.languages || {}).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={country.flags.alt || `flag of ${country.name.common}`}
        width="200"
      />

      {capital && <Weather city={capital} />}
    </div>
  )
}

export default Country
