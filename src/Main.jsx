import React, { useEffect, useState } from 'react';
import SectionRight from './components/SectionRight';
import './weather';
export default function Main() {
  const [weatherData, setWeatherData] = useState({
    temp: '',
    humidity: '',
    cloudy: '',
    wind: '',
    icon: '',
    cityName: 'seoul',
    weatherState: '',
  });


  const API_KEY = '34f5bab903dd6038a7f95d595922df32';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // 현재 날씨
  useEffect(() => {
    fetch(`${BASE_URL}?q=${weatherData.cityName}&appid=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const { wind, clouds, main, weather } = data;
       setWeatherData({
          temp: main.temp,
          wind: wind.speed, 
          cloudy: clouds.all,
          humidity: main.humidity,  
          weatherState: weather[0].main,
          icon: weather[0].icon,
          cityName: weatherData.cityName,
       })
      });
  }, [weatherData.cityName]);

  const bulidDate = () => {
    const time = new Date();
    const hours = time.getHours();
    const mins = time.getMinutes();
    const day = days[time.getDay()];
    const date = time.getDate();

    return { time, hours, mins, day, date };
  };

  const { hours, mins, day, date } = bulidDate();

  const changeCity = (name) =>{
    setWeatherData({ ...weatherData, cityName: name });
  }

  return (
    <div className="weatherWrap">
      <div className="section_left">
        <h1>the.weather</h1>
        <div className="weather_text">
          <p className="temperature">{Math.round(weatherData.temp - 273.15)}℃</p>
          <p className="city_name">
            {weatherData.cityName}
            <span className="clock">
              {hours}:{mins < 10 ? '0' : ''}
              {mins} {day} {date}
            </span>
          </p>
          <div className="icon_box">
            <i className="icon">
              <img src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="Weather Icon" />
            </i>
            <span className="weather_state">{weatherData.weatherState}</span>
          </div>
        </div>
      </div>
      <SectionRight humidity={weatherData.humidity} wind={weatherData.wind} cloudy={weatherData.cloudy} changeCity={changeCity} />
    </div>
  );
}
