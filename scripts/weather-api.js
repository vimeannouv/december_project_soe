
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
    const scrollboxList = document.querySelector(".forecast-temp .scroll-container ul");
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-33.8974&longitude=150.9345&hourly=temperature_2m,rain&current=temperature_2m,rain&timezone=auto&forecast_days=1");

    try {
        if (!response.ok) 
            throw new Error(response.status);

        // current weather
        const content = await response.json();
        const celciusUnit = content.current_units.temperature_2m;

        const currentTemp = content.current.temperature_2m;
        const currentRain = content.current.rain;
        const currentDate = content.current.time;

        const currentDateList = currentDate.split("T");

        // current date of weather
        currentDateDisplay.textContent = `${reorderDate(currentDateList[0])} at ${convertTo12Hour(currentDateList)}`;

        currentTempDisplay.textContent = currentTemp + celciusUnit;

        // forcasted weather
        for (let i = 0; i < content.hourly.temperature_2m.length; i++) {
            const date = content.hourly.time[i];
            const temp = content.hourly.temperature_2m[i];
            const rain = content.hourly.rain[i]; 
            
            const time = convertTo12Hour(date);
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = `<span class="fa-solid fa-cloud-rain"></span> ${time}: <span class="bold">${temp + celciusUnit}</span>`;
            li.appendChild(p);
            scrollboxList.append(li);
        }

    } catch(error) {
        console.log(error)
    }
}

document.addEventListener("DOMContentLoaded", ev => writeWeather(ev))