const apiKey = "772abaff171030d32783004794d4924c";

/* CURRENT WEATHER */
async function getWeather() {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Lagos&units=metric&appid=${apiKey}`);
        const data = await res.json();

        document.getElementById("temp").textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById("desc").textContent = capitalize(data.weather[0].description);

    } catch (error) {
        console.error("Weather error:", error);
        document.getElementById("temp").textContent = "Weather unavailable";
    }
}

/* 3-DAY FORECAST */
async function getForecast() {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Lagos&units=metric&appid=${apiKey}`);
        const data = await res.json();

        const forecastEl = document.getElementById("forecast");
        forecastEl.innerHTML = "";

        const days = data.list
            .filter(item => item.dt_txt.includes("12:00:00"))
            .slice(0, 3);

        days.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short"
            });

            forecastEl.innerHTML += `
                <p>${date}: ${Math.round(day.main.temp)}°C</p>
            `;
        });

    } catch (error) {
        console.error("Forecast error:", error);
    }
}

/* CAPITALIZE TEXT */
function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

/* INIT */
getWeather();
getForecast();

/* SPOTLIGHT */
function spotlight() {
    fetch("data/members.json")
        .then(res => res.json())
        .then(data => {
            const filtered = data.filter(m => m.membership >= 2);

            const random = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);

            const container = document.getElementById("spotlightCards");

            random.forEach(m => {
                const div = document.createElement("div");
                div.className = "card glass";

                div.innerHTML = `
                    <img src="images/${m.image}" alt="${m.name}">
                    <h3>${m.name}</h3>
                    <p>${m.address}</p>
                    <p>${m.phone}</p>
                    <a href="${m.website}" target="_blank">Visit →</a>
                `;

                container.appendChild(div);
            });
        });
}

/* FOOTER */
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

/* INIT */
spotlight();