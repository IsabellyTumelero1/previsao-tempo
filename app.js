async function fetchWeather() {
    try {
        const response = await fetch("https://goweather.herokuapp.com/weather/americana");
        const weatherData = await response.json();
        
        document.getElementById("temperature").textContent = weatherData.temperature;
        document.getElementById("wind").textContent = weatherData.wind;
        document.getElementById("description").textContent = weatherData.description;
        
        const forecastContainer = document.getElementById("forecast");
        forecastContainer.innerHTML = "";
        
        weatherData.forecast.forEach((day, index) => {
            const dayElement = document.createElement("div");
            dayElement.classList.add("day");
            dayElement.innerHTML = `<i class="bi bi-thermometer-half"><strong>Dia ${index + 1}:</strong> ${day.temperature}, ${day.wind} <i class="bi bi-wind"></i>`;
            forecastContainer.appendChild(dayElement);
        });
    } catch (error) {
        console.error("Erro ao buscar os dados do clima", error);
    }
}

function fnMudarIcones(description){
    if(description == "Partly cloudy"){
        document.getElementById("icone").className = "<i class='bi bi-cloud-sun'></i>";
        // document.getElementById("body").className = "bg.nublado";
    }else if(description == "Sunny"){
        document.getElementById("icones").className = "<i class='bi bi-sun'></i>";
        //document.getElementById("body").className = "bg.ensolarado";
    }else if(description == "Light rain"){
        document.getElementById("icones").className = "<i class='bi bi-cloud-rain'></i>";
        //document.getElementById("body").className = "bg.chuvoso";
    }
}

fetchWeather();
