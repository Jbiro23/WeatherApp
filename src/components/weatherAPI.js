import axios from "axios";

//https://api.weatherapi.com/v1/current.json?key=d073dc92101c418db13110218253110&q=London&aqi=no
//https://api.weatherapi.com/v1/forecast.json?key=d073dc92101c418db13110218253110&q=Osijek&days=7&aqi=no&alerts=no

export async function getCurrentWeatherForLocation(location) {
    try {
        return await axios.get(process.env.API_URL+"/v1/current.json", {
            params: {
                key: process.env.API_KEY,
                q: location,
                aqi: "no"
            }
        });
    }catch(exception){
        return alert("Something went wrong with getting current weather for location! Try again!");
    }

}

export async function getWeatherForUpcomingDays(location, days) {
    try {
        return await axios.get(process.env.API_URL+"/v1/forecast.json", {
            params: {
                key: process.env.API_KEY,
                aqi: "no",
                alerts: "no",
                days: days,
                q: location,
            }
        });
    }catch(exception){
        return alert("Something went wrong with getting forecast! Try again!");
    }

}

export async function getWeatherInFuture(location, date) {
    try {
        return await axios.get(process.env.API_URL+"/v1/future.json", {
            params: {
                key: process.env.API_KEY,
                dt: date,
                q: location
            }
        })
    }catch(exception){
        return alert("Something went wrong with fetching data for weather in future! Try again!");
    }
}

