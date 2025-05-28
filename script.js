// API key
const apiKey = 'YOUR_API_KEY_HERE';

// Select elements
const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search-btn');
const weatherInfo = document.querySelector('#weather-info');
const cityName = document.querySelector('#city-name');
const temperature = document.querySelector('#temperature');
const conditions = document.querySelector('#conditions');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
const weatherIcon = document.querySelector('#weather-icon');

// Add event listener to search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    }
});

// Fetch weather data from API
function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => console.error('Error:', error));
}

// Display weather data
function displayWeatherData(data) {
    const city = data.name;
    const temp = data.main.temp;
    const condition = data.weather[0].description;
    const humid = data.main.humidity;
    const wind = data.wind.speed;
    const icon = data.weather[0].icon;

    cityName.textContent = city;
    temperature.textContent = `${temp}°C`;
    conditions.textContent = condition;
    humidity.textContent = `Humidity: ${humid}%`;
    windSpeed.textContent = `Wind Speed: ${wind} m/s`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    weatherInfo.classList.remove('hidden');
}
