const api_Key = "e71de8fb64872860f9b856121569351c";
const api_url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search_box");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error");

async function checkWeather(city){
    const response = await fetch(api_url + city +`&appid=${api_Key}`);
    if(response.status == 404){
        errorMessage.style.display = "block";
    }
    else{
        errorMessage.style.display = "none";
    }
    let data = await response.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+ "°c";
    document.querySelector(".humid-info").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind-info").innerHTML = data.wind.speed+" Km/hr";


    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "/Resources/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "/Resources/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "/Resources/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "/Resources/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "/Resources/mist.png";
    }
    else{
        weatherIcon.src = "/Resources/snow.png";
    }

    document.querySelector(".weather").style.display = "block";

    searchBox.value = "";
}

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
})

searchBox.addEventListener("keyup",(e)=>{
    if(e.keyCode === 13){
        checkWeather(searchBox.value);
    }
})

checkWeather();
