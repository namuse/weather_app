const apiKey = "6d8a37dd698055264b709964d3506603";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`City not found: ${city}`);
        }

        const data = await response.json();

        // Update the UI with weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

        // Update the weather icon based on the weather condition
        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                document.querySelector(".advice").innerHTML = "It might be a bit cloudy. A light jacket is recommended.";
                break;
            case "Clear":
                weatherIcon.src = "images/clear.png";
                document.querySelector(".advice").innerHTML = "Sunny day! Wear light and comfortable clothes.";
                break;
            case "Rain":
                weatherIcon.src = "images/rain.png";
                document.querySelector(".advice").innerHTML = "Don't forget your umbrella and waterproof clothing.";
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                document.querySelector(".advice").innerHTML = "Light rain outside, a raincoat or umbrella will help.";
                break;
            case "Mist":
                weatherIcon.src = "images/mist.png";
                document.querySelector(".advice").innerHTML = "Visibility is low due to mist, drive safely and wear warm clothes.";
                break;
            default:
                weatherIcon.src = "images/default.png"; // Optional: a default icon
                document.querySelector(".advice").innerHTML = "Check the weather and dress comfortably.";
                break;
        }

        // Show the weather section and hide the error message
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert(error.message); // Alert the user if there's an error
        document.querySelector(".weather").style.display = "none"; // Hide weather section on error
        document.querySelector(".error").style.display = "block"; // Show error message
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value); // Use 'value' instead of 'Value'
});