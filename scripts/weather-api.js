document.addEventListener("DOMContentLoaded", async ev => {
    const weatherApp = document.getElementById("weather-app")
    const currentTemp = document.querySelector(".current-temp");

    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-33.8974&longitude=150.9345&hourly=temperature_2m,rain&current=temperature_2m,rain,apparent_temperature&forecast_days=1");

    try {
        if (!response.ok) 
          throw new Error(response.status);

        const content = await response.json();
        const celciusUnit = content.current_units.temperature_2m;

        const currentTemp = content.current.temperature_2m;
        const currentRain = content.current.rain;
        const currentTime = content.current.time;

        for (let i = 0; i < content.hourly.temperature_2m.length; i++) {
            const date = content.hourly.time[i];
            const temp = content.hourly.temperature_2m[i];
            const rain = content.hourly.rain[i];            
        }
        currentTemp.textContent = `Current temperature: ${currentTemp} ${celciusUnit}`;

    } catch(error) {
        console.log(error)
    }
})