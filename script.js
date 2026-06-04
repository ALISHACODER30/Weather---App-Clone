const apiKey = "e0c9115b4e06b3bb90aa54779027aa7f";

const searchInput =
document.getElementById("searchInput");

const searchBtn =
document.getElementById("searchBtn");

const city =
document.getElementById("city");

const temperature =
document.getElementById("temperature");

const condition =
document.getElementById("condition");

const humidity =
document.getElementById("humidity");

const wind =
document.getElementById("wind");

const feelsLike =
document.getElementById("feelsLike");

const visibility =
document.getElementById("visibility");

const weatherCard =
document.getElementById("weatherCard");

const weatherEffects =
document.getElementById("weatherEffects");

const weatherIcon =
document.getElementById("weatherIcon");


const WEATHER_CARD_BASE =
    "group relative w-full shrink min-h-0 overflow-hidden rounded-3xl sm:rounded-[32px] md:rounded-[40px] border border-white/15 bg-slate-900/55 backdrop-blur-2xl ring-1 ring-inset ring-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55)] text-white transition-all duration-700";


// WEATHER ICONS

function updateWeatherIcon(weatherType) {

    if (weatherType === "Clear") {
        weatherIcon.innerHTML = "☀️";
    }

    else if (weatherType === "Clouds") {
        weatherIcon.innerHTML = "☁️";
    }

    else if (
        weatherType === "Rain" ||
        weatherType === "Drizzle"
    ) {
        weatherIcon.innerHTML = "🌧";
    }

    else if (
        weatherType === "Thunderstorm"
    ) {
        weatherIcon.innerHTML = "⛈";
    }

    else if (weatherType === "Snow") {
        weatherIcon.innerHTML = "❄️";
    }

    else if (
        weatherType === "Haze" ||
        weatherType === "Mist" ||
        weatherType === "Fog"
    ) {
        weatherIcon.innerHTML = "🌫";
    }

    else {
        weatherIcon.innerHTML = "⛅";
    }
}


// WEATHER EFFECTS

function updateWeatherEffects(weatherType) {

    weatherEffects.innerHTML = "";

    weatherCard.className = WEATHER_CARD_BASE;


    // SUNNY

    if (weatherType === "Clear") {

        weatherCard.classList.add(
            "border-amber-400/25",
            "shadow-[0_25px_60px_-15px_rgba(251,191,36,0.25)]",
            "bg-gradient-to-br",
            "from-amber-500/25",
            "via-slate-900/50",
            "to-orange-600/20"
        );

        weatherEffects.innerHTML =
            `<div class="sun-glow"></div>`;
    }


    // CLOUDS

    else if (weatherType === "Clouds") {

        weatherCard.classList.add(
            "border-slate-400/25",
            "shadow-[0_25px_60px_-15px_rgba(148,163,184,0.2)]",
            "bg-gradient-to-br",
            "from-slate-500/25",
            "via-slate-900/50",
            "to-slate-800/30"
        );

        weatherEffects.innerHTML =
            `
            <img
            src="https://cdn-icons-png.flaticon.com/512/414/414825.png"
            class="cloud top-10"
            >

            <img
            src="https://cdn-icons-png.flaticon.com/512/414/414825.png"
            class="cloud top-40"
            style="animation-duration:30s"
            >
            `;
    }


    // RAIN

    else if (
        weatherType === "Rain" ||
        weatherType === "Drizzle"
    ) {

        weatherCard.classList.add(
            "border-blue-400/30",
            "shadow-[0_25px_60px_-15px_rgba(59,130,246,0.3)]",
            "bg-gradient-to-br",
            "from-blue-600/30",
            "via-slate-900/55",
            "to-indigo-950/40"
        );

        for (let i = 0; i < 100; i++) {

            weatherEffects.innerHTML +=
                `
                <div
                class="rain-drop"
                style="
                left:${Math.random() * 100}%;
                animation-delay:${Math.random()}s;
                ">
                </div>
                `;
        }
    }


    // THUNDERSTORM

    else if (
        weatherType === "Thunderstorm"
    ) {

        weatherCard.classList.add(
            "border-violet-500/35",
            "shadow-[0_25px_60px_-15px_rgba(139,92,246,0.35)]",
            "bg-gradient-to-br",
            "from-violet-900/40",
            "via-slate-950/60",
            "to-black/50"
        );

        weatherEffects.innerHTML =
            `<div class="flash"></div>`;
    }


    // SNOW

    else if (weatherType === "Snow") {

        weatherCard.classList.add(
            "border-cyan-300/30",
            "shadow-[0_25px_60px_-15px_rgba(103,232,249,0.2)]",
            "bg-gradient-to-br",
            "from-cyan-400/25",
            "via-slate-900/50",
            "to-blue-500/25"
        );

        for (let i = 0; i < 50; i++) {

            weatherEffects.innerHTML +=
                `
                <div
                class="snowflake"
                style="
                left:${Math.random() * 100}%;
                font-size:${Math.random() * 20 + 10}px;
                animation-duration:${Math.random() * 5 + 5}s;
                ">
                ❄
                </div>
                `;
        }
    }


    // HAZE / FOG

    else if (
        weatherType === "Haze" ||
        weatherType === "Mist" ||
        weatherType === "Fog"
    ) {

        weatherCard.classList.add(
            "border-slate-400/20",
            "shadow-[0_25px_60px_-15px_rgba(100,116,139,0.2)]",
            "bg-gradient-to-br",
            "from-slate-500/20",
            "via-slate-900/55",
            "to-slate-800/35"
        );
    }
}



// GET WEATHER FUNCTION

async function getWeather(cityName) {

    try {

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        const response =
            await fetch(url);

        const data =
            await response.json();

        console.log(data);

        if (data.cod === "404") {

            alert("City not found");
            return;
        }


        // UPDATE UI

        city.innerText =
            data.name;

        temperature.innerText =
            `${Math.round(data.main.temp)}°C`;

        condition.innerText =
            data.weather[0].main;

        humidity.innerText =
            `${data.main.humidity}%`;

        wind.innerText =
            `${data.wind.speed} km/h`;

        feelsLike.innerText =
            `${Math.round(data.main.feels_like)}°C`;

        visibility.innerText =
            `${data.visibility / 1000} km`;



        const weatherType =
            data.weather[0].main;


        updateWeatherIcon(weatherType);

        updateWeatherEffects(weatherType);

    }

    catch (error) {

        console.log(error);

        alert("Something went wrong");
    }
}



// BUTTON SEARCH

searchBtn.addEventListener(
    "click",
    function () {

        const cityName =
            searchInput.value.trim();

        if (cityName === "") {

            alert("Please enter city name");
            return;
        }

        getWeather(cityName);
    }
);



// ENTER KEY SEARCH

searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            const cityName =
                searchInput.value.trim();

            if (cityName === "") {

                alert(
                    "Please enter city name"
                );

                return;
            }

            getWeather(cityName);
        }
    }
);