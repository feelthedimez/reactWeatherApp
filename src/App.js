// import { WiDaySunny } from 'weather-icons-react';
// eslint-disable-next-line
import userEvent from '@testing-library/user-event';
import Nav from './components/SimpleNav/Nav';
import React, {useState, useEffect} from 'react';


function App() {
    const [getLocation, setLocation] = useState({latitute: '-26.2034319', longitude: '28.042257'});
    const [currentWeather, setWeather] = useState({})


    useEffect(() => {
        getCurrentLocation()
    }, [])


    useEffect(() => {
        getWeatherData()
    }, [])


    const getCurrentLocation = () => {
        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(pos => {
            let coordinates = pos.coords;
            setLocation({latitute: coordinates.latitude, longitude: coordinates.longitude})
        }, () => console.log('error'), options);

        console.log(getLocation)
    }

    let exec = () => {
      getCurrentLocation();
      getWeatherData();
    }

    const getWeatherData = async () => {

        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${
            getLocation.latitute
        }&lon=${
            getLocation.longitude
        }&units=metric&appid=011f9ade363009c9133ac05f4226b4f7`)
        const responseData = await response.json();

        const currentData = {
            "currentTemp": responseData.current.temp,
            "currentDate": new Date(responseData.current.dt * 1000),
            "currentWeather": responseData.current.weather[0].main,
            "currentWeather-des": responseData.current.weather[0].description
        }

        const futureForecast = responseData.daily.slice(0, 5).map(daily => {
            return {
                "futureTemp": daily.temp.day,
                "futureDate": new Date(daily.dt * 1000),
                "futureWeather": daily.weather[0].main,
                "futureWeather-des": daily.weather[0].description
            }
        });

        setWeather({"currentWeather": currentData, "futureWeather": futureForecast})

    }


    return (
        <div>
          <Nav />
            <button onClick={exec}>CRAZY!!</button>
        </div>
    );
}

export default App;
