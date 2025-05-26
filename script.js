const apiKey = 'a6077fb37d6724ae64d6b4c4421724b4';
const weatherContainer = document.getElementById('weather');

async function getWeather() {
    try {

        const response = await fetch(`https://api.weatherstack.com/current?access_key=${apiKey}&query=New York`);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherContainer.innerHTML = `Error fetching weather data`;
    }
}

function displayWeather(data) {
    if (data.error) {
        weatherContainer.innerHTML = `${data.error.info}`;
    } else {
        const { temperature, weather_descriptions } = data.current;
        const { location } = data.current;

        let clothingAdvice = '';
        if (temperature < 10) {
            clothingAdvice = 'Wear heavy clothing like a coat and scarf.';
        } else if (temperature < 20) {
            clothingAdvice = 'A light jacket should be fine.';
        } else {
            clothingAdvice = 'Light clothing is recommended.';
        }

        weatherContainer.innerHTML = `
            ${location.name}, ${location.country}
            <hr>
            ${weather_descriptions[0]}
            ${temperature}°C
            <br>
            ${clothingAdvice}
        `;
    }
}

getWeather();