const apiKey = "13cb026a3bd6f86d30aa2f34948d2344"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Function to fetch and display weather
async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error("Invalid city");
        }

        const data = await response.json();
        const currentWeather = data.list[0]; // Current forecast
        const nightWeather = data.list.find(item => item.dt_txt.includes("21:00:00")) || currentWeather; // 9 PM data

        // Get temperatures
        const currentTemp = Math.round(currentWeather.main.temp);
        const nightTemp = Math.round(nightWeather.main.temp);
        const minTemp = Math.round(currentWeather.main.temp_min);
        const maxTemp = Math.round(currentWeather.main.temp_max);

        document.querySelector(".city").innerText = data.city.name;
        document.querySelector(".temp").innerHTML = `🌡️ ${currentTemp}°C <br> 🌙 ${nightTemp}°C <br> 📉 ${minTemp}°C | 📈 ${maxTemp}°C`;
        document.querySelector(".humidity").innerText = nightWeather.main.humidity + "%";
        document.querySelector(".wind").innerText = nightWeather.wind.speed + " km/h";

        // Change weather icon based on API response
        const weatherCondition = nightWeather.weather[0].main.toLowerCase();
        if (weatherCondition.includes("cloud")) {
            weatherIcon.src = "clouds.png";
        } else if (weatherCondition.includes("clear")) {
            weatherIcon.src = "clear.png";
        } else if (weatherCondition.includes("rain")) {
            weatherIcon.src = "rain.png";
        } else if (weatherCondition.includes("drizzle")) {
            weatherIcon.src = "drizzle.png";
        } else if (weatherCondition.includes("mist")) {
            weatherIcon.src = "mist.png";
        }

        document.querySelector(".weather").style.display = "block"; 
        document.querySelector(".error").style.display = "none";   

    } catch (error) {
        document.querySelector(".error").style.display = "block"; 
        document.querySelector(".weather").style.display = "none"; 
    }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    }
});
