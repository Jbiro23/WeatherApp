import axios from "axios";
import { getSearchedLocation } from "./components/location";
import { getCurrentWeatherForLocation, getWeatherForUpcomingDays, getWeatherInFuture } from "./components/weatherApi";
import { getDateInFuture } from "./helpers/dateHelper";
import { getGeolocationForCoords } from "./components/openWeatherApi";

import { applyTheme } from "./helpers/theme";
import { updateLocationStorage, loadOrSearchedLocation } from "./helpers/storage";
import { renderDayCard, renderHourlyTable } from "./components/forecastRenderer";
import { setupMyLocationButton } from "./components/geolocation";
import { initScroller } from "./components/scroller";

let locationName = loadOrSearchedLocation(getSearchedLocation);
updateLocationStorage(locationName);

document.getElementById("locationName").innerText = locationName;

document.getElementById("changeLocation").addEventListener("click", () => {
    updateLocationStorage(getSearchedLocation());
    window.location.reload();
});

setupMyLocationButton("ShowWeatherForMyLocation", getGeolocationForCoords, updateLocationStorage);

const response = await getCurrentWeatherForLocation(locationName);
document.getElementById("weatherIcon").src = response.data.current.condition.icon;
document.getElementById("currentTemp").innerText = Math.round(response.data.current.temp_c)+"°";
const isNight = !response.data.current.is_day;
applyTheme(isNight);

const forecastResponse = await getWeatherForUpcomingDays(locationName, 7);

const weatherForecast = document.getElementById("WeatherForecast");
const singleDayForecast = document.getElementById("dayForecast");

for (const forecast of forecastResponse.data.forecast.forecastday) {

    const card = renderDayCard(forecast, weatherForecast);
    card.addEventListener("click", () => {
        singleDayForecast.innerHTML = "";
        renderHourlyTable(forecast.hour, singleDayForecast);
    });
}

const dateFormatted = getDateInFuture(30);
await getWeatherInFuture(locationName, dateFormatted);

initScroller("#WeatherForecast", ".forecast-nav.prev", ".forecast-nav.next");
