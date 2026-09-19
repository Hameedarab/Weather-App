let input =document.querySelector('.country input');
let btn=document.querySelector('.btn')
 
btn.addEventListener('click',async function getWeather() {
   const fetchWeather = fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=714fe9db87c0875852fda23f2402825d&units=metric`
);
    try {
        input.value="";
        btn.innerText='Loading...'
       
        const respons = await fetchWeather;
        const data = await respons.json();
        console.log(data)
          btn.innerText='Generate'
        updateWeatherUI(data);
        changeWeatherBackground(data);
      
        console.log(data)
        
    } catch (error) {
        const tempratuer = document.querySelector(".temp");
          console.log(input.value);
        tempratuer.innerHTML = `Loading...`;
        tempratuer.style.fontSize = "3rem"
        noInternetFooterLoading()

        setTimeout(function () {
            tempratuer.innerHTML = `No internet </br> Please try again`
            tempratuer.style.fontSize = '2.2rem'
        }, 3000)
        btn.innerText='Generat'
       
    }
})

function changeWeatherBackground(data) {
    let weatherMain = data.weather[0].main.toLowerCase();
    document.body.classList.remove("sunny", "rainy", "clear", "cloudy");
    if (weatherMain === 'clear') {
        document.body.className = 'clear';

    } else if (weatherMain === 'sunny' || weatherMain === 'clear') {
        document.body.className = 'sunny';

    } else if (weatherMain === 'clouds') {
        document.body.className = "cloudy";

    } else if (weatherMain === 'rain' || weatherMain === 'drizzle' || weatherMain === 'thunderstorm') {
        document.body.className = 'rainy';

    } else {
        document.body.className = 'clear'
    }
}

function updateWeatherUI(data) {
    // input.value="";
    const city = document.querySelector("#cityName");
    city.innerHTML = `${data.name} City`;
    const tempratuer = document.querySelector(".temp");
    tempratuer.innerHTML = `${data.main.temp}&deg;C`;
    const mainText = document.querySelector(".main");
    mainText.innerHTML = data.weather[0].main;
    
    const descriptions = document.querySelector(".description");
    descriptions.innerHTML = data.weather[0].description;

    const humidity = document.querySelector(".humdty");
    humidity.innerHTML = `${data.main.humidity} %`
    const airPressure = document.querySelector(".airPr");
    airPressure.innerHTML = `${data.main.pressure} Pa`
    const windSpeed = document.querySelector(".wndSpd")
    windSpeed.innerHTML = `${data.wind.speed} Km/h`

    const feelsLike = document.querySelector(".feelsLike");
    feelsLike.innerHTML = `${data.main.feels_like}&deg;C`
    const maximumTempratuer = document.querySelector(".max_tem");
    maximumTempratuer.innerHTML = `${data.main.temp_max} &deg;C`
    const manimumTempratuer = document.querySelector(".min_tem");
    manimumTempratuer.innerHTML = `${data.main.temp_min} &deg;C`
    const seaLevel = document.querySelector(".seaLevel");
    seaLevel.innerHTML = `${data.main.sea_level} hPa`
}

function noInternetFooterLoading() {
    const feelsLike = document.querySelector(".feelsLike");
    feelsLike.innerHTML = `Loading...`
    const maximumTempratuer = document.querySelector(".max_tem");
    maximumTempratuer.innerHTML = `Loading...`
    const manimumTempratuer = document.querySelector(".min_tem");
    manimumTempratuer.innerHTML = `Loading...`
    const seaLevel = document.querySelector(".seaLevel");
    seaLevel.innerHTML = `Loading...`
    document.body.className = 'noInternet_background'
}

// getWeather()