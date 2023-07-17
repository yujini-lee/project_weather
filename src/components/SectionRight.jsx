import React, { useState } from 'react';

export default function SectionRight({ humidity, wind, cloudy, changeCity }) {
  
  const[input, setInput] = useState('');
  const handleChange = (e) =>{
    setInput(e.target.value);
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    changeCity(input);
    setInput('');
  }

  return (
    <section className="section_right">
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="search"
            className="search_input"
            placeholder="Another Location"
            autoComplete="off"
            onChange={handleChange}
            value={input}
          />
          <button type="submit" className="search_btn">
            <i className="fas fa-search icon-search"></i>
          </button>
        </form>
        <ul className="history">
          <li id="0">
            <div>Seoul</div>
            <i className="fas fa-times remove_history"></i>
          </li>
        </ul>
      </div>
      <div className="weather_detail">
        <h2>Weather Details</h2>
        <ul className="detail_state">
          <li className="item">
            <div>Cloudy</div>
            <div>{cloudy}%</div>
          </li>
          <li className="item">
            <div>Humidity</div>
            <div>{humidity}%</div>
          </li>
          <li className="item">
            <div>Wind</div>
            <div>{wind}km/h</div>
          </li>
        </ul>
      </div>
      {/* <div className="copyright">Designed by <a className="link" href="https://dribbble.com/shots/7118235-Weather-DailyUI-037" rel="noreferrer" target="_blank">Arthur K</a></div>
      <div className="copyright">Made by <a className="link" href="https://github.com/keemtj" rel="noreferrer" target="_blank">Keemtj</a></div><a class="link" href="https://github.com/keemtj" rel="noreferrer" target="_blank">
    </a> */}
    </section>
  );
}
