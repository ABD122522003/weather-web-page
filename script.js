const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
const cityName = document.getElementById('cityName');
const detectLocationBtn = document.getElementById('detectLocationBtn');
const detectedLocation = document.getElementById('detectedLocation');
const currentLocationBox = document.getElementById('currentLocationBox');

async function checkWeather(city) {
    const api_key = "bd5641b4ade59e9c9e7f343ad1b66aba";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if (weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        return;
    }

    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;
    cityName.innerHTML = weather_data.name; // Displaying city name

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weather_img.src = "/assets/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "/assets/clear.png";
            break;
        case 'Rain':
            weather_img.src = "/assets/rain.png";
            break;
        case 'Mist':
            weather_img.src = "/assets/mist.png";
            break;
        case 'Snow':
            weather_img.src = "/assets/snow.png";
            break;
    }
}

// Event listener for Search Button
searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

// Function to get Current Location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const api_key = "bd5641b4ade59e9c9e7f343ad1b66aba";
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;

            const weather_data = await fetch(url).then(response => response.json());

            if (weather_data.cod === `404`) {
                location_not_found.style.display = "flex";
                weather_body.style.display = "none";
                return;
            }

            location_not_found.style.display = "none";
            weather_body.style.display = "flex";
            temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
            description.innerHTML = `${weather_data.weather[0].description}`;
            humidity.innerHTML = `${weather_data.main.humidity}%`;
            wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;
            cityName.innerHTML = weather_data.name; // Displaying city name

            detectedLocation.innerHTML = `Detected Location: ${weather_data.name}`;
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Event listener for Detect Current Location Button
detectLocationBtn.addEventListener('click', () => {
    getCurrentLocation();
});
