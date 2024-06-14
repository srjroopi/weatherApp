import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import styles from './App.module.css'
import{ WeatherData}from './WeatherData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faCloudSun, faTemperatureThreeQuarters, faWater, faWind} from "@fortawesome/free-solid-svg-icons";

const App: React.FC = () => {
 const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
 const [city, setCity] = useState<string>('');
 const api='6f32800ec9ccbe79c12852d9e25a5142';
 const fetchWeatherData = async () => {
   if (!city) return;
   try {
     const response = await axios.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`);
     setWeatherData(response.data);
   } catch (error) {
     console.error('Error fetching weather data:', error);
   }
 };
 const handleCityChange = (e: ChangeEvent<HTMLInputElement>) => {
   setCity(e.target.value);
 };
 const handleSubmit = (e: FormEvent) => {
   e.preventDefault();
   fetchWeatherData();
 };
 const renderWeatherData = () => {
   if (weatherData) {
     return (
      <div>
        <h2>{weatherData.name}, {weatherData.sys.country}</h2>
        <table>
          <tbody>
            <tr>
              <td><FontAwesomeIcon icon={faTemperatureThreeQuarters}/></td>
              <td>Temperature</td>
              <td> {weatherData.main.temp}°C</td>
            </tr>
            <tr>
              <td><FontAwesomeIcon icon={faCloudSun}/></td>
              <td>Weather:</td>
              <td> {weatherData.weather[0].description}</td>
            </tr>
            <tr>
              <td><FontAwesomeIcon icon={faWater}/></td>
              <td>Humidity:</td>
              <td>{weatherData.main.humidity}%</td>
            </tr>
            <tr>
              <td><FontAwesomeIcon icon={faWind}/></td>
              <td>Wind Speed:</td>
              <td>{weatherData.wind.speed} m/s</td>
            </tr>
          </tbody>
        </table>
      </div>
     );
   }
   return null;
 };
 return (
  <div className={styles.bg}>
    <h1>Weather App</h1>
  <div>
    <form className={styles.form}>
      <input
          className={styles.input}
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
          required
       />
        <FontAwesomeIcon icon={faCloud} 
        className={styles.button}
        onClick={handleSubmit}/>
    </form>
    </div>
    <div className={styles.cards}>
        {renderWeatherData()}
        </div>
     </div>
 );
};
export default App;