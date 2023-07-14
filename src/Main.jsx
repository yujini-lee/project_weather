import React, { useEffect, useState } from 'react';
import Section_right from './components/Section_right';
import './weather';
export default function Main() {
  const [temp, setTemp] = useState('');
  const [humidity, sethumidity] = useState('');
  const [cloudy, setcloudy] = useState('');
  const [wind, setWind] = useState('');
  const [icon, setIcon] = useState('');
  const [cityName, setCityName] = useState('seoul');
  const [weatherState, setWeatherState] = useState('');
  const API_KEY = '34f5bab903dd6038a7f95d595922df32';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // 현재 날씨
  useEffect(() => {
    fetch(`${BASE_URL}?q=${cityName}&appid=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTemp(data.main.temp);
        setWind(data.wind.speed);
        setcloudy(data.clouds.all);
        sethumidity(data.main.humidity);
        setWeatherState(data.weather[0].main);
        setIcon(data.weather[0].icon);
      });
  }, [cityName]);

  const bulidDate = () => {
    const time = new Date();
    const hours = time.getHours();
    const mins = time.getMinutes();
    const day = days[time.getDay()];
    const date = time.getDate();

    return { time, hours, mins, day, date };
  };

  let getDate = bulidDate();

  const changeCity = (name) =>{
    setCityName(name);
  }

  return (
    <div className="weatherWrap">
      <div className="section_left">
        <h1>the.weather</h1>
        <div className="weather_text">
          <p className="temperature">{Math.round(temp - 273.15)}℃</p>
          <p className="city_name">
            {cityName}
            <span className="clock">
              {getDate.hours}:{getDate.mins < 10 ? '0' : ''}
              {getDate.mins} {getDate.day} {getDate.date} {getDate.moon}
            </span>
          </p>
          <div className="icon_box">
            <i className="icon">
              <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
            </i>
            <span className="weather_state">{weatherState}</span>
          </div>
        </div>
      </div>
      <Section_right humidity={humidity} wind={wind} cloudy={cloudy} changeCity={changeCity}/>
    </div>
  );
}
