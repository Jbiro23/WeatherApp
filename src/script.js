import axios from 'axios';
import { getUserLocation, getSearchedLocation } from "./components/location";
import {getCurrentWeatherForLocation, getWeatherForUpcomingDays, getWeatherInFuture} from "./components/weatherApi";
import { getDateInFuture} from "./helpers/dateHelper";
import {getGeolocationForCoords} from "./components/openWeatherApi";

let location = localStorage.getItem("location") || getSearchedLocation();
updateLocation(location);

document.getElementById("changeLocation").addEventListener("click", () => {
    updateLocation(getSearchedLocation());
    window.location.reload();
})

document.getElementById("ShowWeatherForMyLocation").addEventListener("click", async () => {
    if(!navigator.geolocation) {
        alert("Vas browser ne podrzava prikazivanje geo lokaicje");
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        let coords = await getGeolocationForCoords(lat,lng)

        let cityName = coords.data[0]['name'];

        if(cityName.includes("Municipality")){
            cityName = cityName.replace("Municipality","");
        }
        updateLocation(cityName);
        window.location.reload();
    });
})

const response = await getCurrentWeatherForLocation(location);
if(!response.data.current.is_day) {
    document.querySelector("body").style.backgroundColor = "gray";
}

const forecastResponse = await getWeatherForUpcomingDays(location, 7);
const dayResponse = await getWeatherForUpcomingDays(location, 1);

let weatherForecast = document.getElementById("WeatherForecast");

for(let forecast of forecastResponse.data.forecast.forecastday) {
    showWeather(forecast);
}

for(let weatherForDay of dayResponse.data.forecast.forecastday){
    showWeather(weatherForDay);
}


const dateFormatted = getDateInFuture(30);

const futureWeather = await getWeatherInFuture(location, dateFormatted);
console.log(futureWeather);

function updateLocation(newLocation) {
    location = newLocation;
    localStorage.setItem("location", newLocation);
}

function showWeather(forecast){
    console.log(forecast);
    console.log("Na dan: "+forecast.date+" maximalna temperatura ce biti: "+forecast.day.maxtemp_c+", a minimalna: "+forecast.day.mintemp_c);
    let singleDay = document.createElement("div");
    singleDay.classList = "singleDay";
    let forecastDate = document.createElement("h4");
    const [y,m,d] = forecast.date.split('-').map(Number);
    const dayOfWeek = new Date(y, m - 1, d).toLocaleDateString('en-US', { weekday: 'long' });
    forecastDate.innerText = dayOfWeek;
    let condition = document.createElement("img");
    condition.setAttribute('src', forecast.day.condition.icon);
    let maxTemp = document.createElement("p");
    maxTemp.innerText = forecast.day.maxtemp_c+"°";
    let minTemp = document.createElement("p");
    minTemp.innerText = forecast.day.mintemp_c+"°";

    singleDay.append(forecastDate,condition, maxTemp, minTemp);
    weatherForecast.append(singleDay);
}

