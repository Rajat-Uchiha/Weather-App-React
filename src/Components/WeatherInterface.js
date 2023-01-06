import React, { useState, useEffect } from "react";
import myLogo from "./myLogo.png";
const WeatherInterface = () => {
  //!To save city name;
  const [CityName, setCityName] = useState("Chandigarh");
  const [weatherObject, setWeatherObject] = useState({});

  //!Function to get city name-------------------------------------------------------
  function getCityName(val) {
    setCityName(val);
  }

  //!Funtion to fetch weather information--------------------------------------------
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${CityName}&units=metric&appid=866a32610b14e8df5740c193cd851694`;

      const response = await fetch(url);
      const Data = await response.json();

      //!Object Destructuring---------------------------------------------------------
      const { temp, humidity, feels_like } = Data.main;
      const { main: weatherMood } = Data.weather[0];
      const { icon: weatherIcon } = Data.weather[0];
      const { name } = Data;
      const { speed } = Data.wind;
      const { country } = Data.sys;

      //!Object to store all data fields.---------------------------------------------
      const myWeatherObject = {
        temp,
        humidity,
        feels_like,
        weatherMood,
        name,
        speed,
        country,
        weatherIcon,
      };

      setWeatherObject(myWeatherObject);
    } catch (error) {
      console.log("Some error has occured while fetching" + error);
    }
  };

  //!UseEffect------------------------------------------------------------------------
  const currDate = new Date().toLocaleDateString();
  useEffect(() => {
    getWeatherInfo();
    let todayDate = document.getElementById("todayDate");
    todayDate.innerText = currDate;
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-300 w-full min-h-screen">
      {/* Heading */}
      <div
        className=" py-4 text-center backdrop-blur-sm flex flex-wrap justify-center items-center bg-black/30"
        id="heading"
      >
        <h1 className="font-Nunito text-xl sm:text-2xl md:text-4xl z-100 text-gray-100">
          Real Time
          <span className="underline underline-offset-4 px-2 ">Weather</span>
          Application
        </h1>
      </div>

      {/* Main Card */}

      <div className=" flex w-full py-6 justify-center font-Nunito items-center min-h-screen md:h-full ">
        {/* Weather Card */}
        <div className=" rounded-xl shadow-2xl bg-gray-100 flex flex-col justify-center p-8 w-4/5 md:w-2/5 items-center">
          <div className="w-full flex justify-center items-center py-2 ">
            <input
              className="py-2 px-4 border-2 border-gray-500 rounded-l-xl w-3/4  md:text-2xl"
              placeholder="Search City"
              type="text"
              value={CityName}
              onChange={(ele) => {
                getCityName(ele.target.value);
              }}
            />
            <button
              onClick={getWeatherInfo}
              className=" bg-green-800 hover:bg-green-700 flex justify-center items-center text-white md:text-2xl rounded-r-xl w-1/4 py-2.5 text-center "
            >
              Search
            </button>
          </div>

          <div className=" w-full text-center ">
            <h3
              id="searchCity"
              className=" text-2xl md:text-5xl py-2 text-gray-800 font-bold"
            >
              {weatherObject.name},
              <span
                id="countryName"
                className=" text-xl md:text-3xl font-bold text-gray-800"
              >
                {weatherObject.country}
              </span>
            </h3>
            <h5 className=" text-xl md:text-2xl py-2 font-bold text-gray-800">
              Today :
              <span id="todayDate" className="text-gray-800 font-bold">
                Jan 5, 2023
              </span>
            </h5>
          </div>

          <div className="flex flex-row  w-full justify-evenly ">
            <div className="flex flex-col justify-center items-center bg-green-800 w-1/2  m-2 rounded-lg md:py-6 py-2">
              <span className=" text-2xl md:text-5xl  text-gray-100 md:py-2">
                {Math.floor(weatherObject.temp)}&#8451;
              </span>
              <span className=" text-md md:text-2xl text-gray-100 ">
                Feels like{" "}
              </span>
              <span className=" text-md md:text-2xl text-gray-100 ">
                {weatherObject.feels_like} C
              </span>
            </div>
            <div className="flex flex-col justify-center items-center bg-blue-800 w-1/2 m-2 rounded-lg md:py-6 py-2">
              <img
                className="h-20 w-20  "
                src={`https://openweathermap.org/img/wn/${weatherObject.weatherIcon}@2x.png`}
                alt="newClound"
              />
              <span className=" text-md md:text-2xl  text-gray-100">
                {weatherObject.weatherMood}
              </span>
            </div>
          </div>
          <div className="flex flex-row  w-full justify-evenly">
            <div className="flex flex-col  justify-center items-center  bg-purple-800 w-1/2  m-2 rounded-lg md:py-6 py-2">
              <h2 className="text-2xl md:text-5xl  text-gray-100 py-2">
                {weatherObject.humidity}
                <span className="text-xl px-1 text-gray-100">%</span>
              </h2>

              <span className="text-md md:text-2xl  text-gray-100">
                Humidity{" "}
              </span>
            </div>
            <div className="flex flex-col justify-center items-center bg-cyan-800 w-1/2  m-2 rounded-lg md:py-6 py-2">
              <span className="text-2xl md:text-5xl  text-gray-100 py-2">
                {weatherObject.speed}
                <span className="text-xl px-1 text-gray-100">Km/hr</span>
              </span>

              <span className="text-md md:text-2xl  text-gray-100">Wind </span>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div
        className=" py-4 text-center flex justify-center items-center backdrop-blur-sm bg-black/30"
        id="footer"
      >
        <a
          href="https://letmeknowmyweather.netlify.app"
          className="font-Nunito text-2xl z-100 text-gray-100 mx-2"
        >
          &#169;letmeknowmyweather.netlify.app
        </a>
        <img src={myLogo} className="w-20 mx-2" alt="myLogo" />
      </div>
    </div>
  );
};

export default WeatherInterface;
