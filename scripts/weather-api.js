
function reorderDate(dateString) {
    const dateParts = dateString.split("-");
    const newDateString = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    return newDateString;
}

function convertTo12Hour(timeString) {
    console.log(timeString);
    const date = new Date(timeString);

    return date.toLocaleString('en-US', {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}

async function writeWeather(ev) {

    const currentTempDisplay = document.querySelector(".current-temp .temperature");
    const currentDateDisplay = document.querySelector(".current-temp .date");

    const averageTempStatDisplay = document.querySelector(".forecast-container .average-temp .stat");
    const averagePrecipStatDisplay = document.querySelector(".forecast-container .average-precipitation .stat");
    const maxTempStatDisplay = document.querySelector(".forecast-container .max-temp .stat");

    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-33.8974&longitude=150.9345&hourly=temperature_2m,rain&current=temperature_2m,rain&timezone=auto&forecast_days=1");

    try {
        if (!response.ok) 
            throw new Error(response.status);
        const content = await response.json();

        // units
        const celciusUnit = content.current_units.temperature_2m;
        const precipUnit = content.current_units.rain
        // current weather

        const currentTemp = content.current.temperature_2m;
        const currentRain = content.current.rain;
        const currentDate = content.current.time;

        const currentDateList = currentDate.split("T");

        // current date of weather
        currentDateDisplay.textContent = `${reorderDate(currentDateList[0])} at ${convertTo12Hour(currentDateList)}`;
        currentTempDisplay.textContent = currentTemp + celciusUnit;

        // forecasted weather

        // average temp
        const hourlyTemps = content.hourly.temperature_2m;
        const averageTemp = hourlyTemps.reduce((previous, current) => previous + current) / hourlyTemps.length;
        averageTempStatDisplay.textContent = averageTemp.toFixed(1) + celciusUnit; // 1 dp
        // max temp

        const maxTemp = Math.max(...hourlyTemps);
        maxTempStatDisplay.textContent = maxTemp + celciusUnit;

        // average precip
        const hourlyPrecips = content.hourly.rain;
        const averagePrecip = hourlyPrecips.reduce((previous, current) => previous + current) / hourlyPrecips.length;
        averagePrecipStatDisplay.textContent = averagePrecip.toFixed(1) + precipUnit;



    } catch(error) {
        console.log(error)
    }
}

function setVisibleForStatDisplayLabels(bool) {
    const statDisplayLabels = document.querySelectorAll(".forecast-container .stat-box .label");
    for (const label of statDisplayLabels) {
        
        if (bool) {
            label.classList.remove("hidden");
        } else {
            label.classList.add("hidden");
        }

    }
}

function resized(ev) {
    const onMobile = window.matchMedia("(max-width: 768px)");
    setVisibleForStatDisplayLabels(!onMobile.matches);
}

document.addEventListener("DOMContentLoaded", ev => writeWeather(ev));
window.addEventListener("resize", ev => resized(ev))