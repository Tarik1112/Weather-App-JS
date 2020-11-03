const api={
    key:"7d13cd2c254074eca62c084c97b424d1",
    base:"https://api.openweathermap.org/data/2.5/"
}

const api_five={
    key:"7d13cd2c254074eca62c084c97b424d1",
    base:"https://api.openweathermap.org/data/2.5/forecast/"
}

const searchbox = document.querySelector('.search');
searchbox.addEventListener('keypress',setQuery);

let whole = document.querySelector('.main');
whole.classList.add('hidden');

let bg = document.querySelector('body');

let dayOne = document.querySelector('.weekDayOne');
let dayTwo = document.querySelector('.weekDayTwo');
let dayThree = document.querySelector('.weekDayThree');
let dayFour = document.querySelector('.weekDayFour');
let dayFive = document.querySelector('.weekDayFive');

let temperatureOne = document.querySelector('.tempOne');
let temperatureTwo = document.querySelector('.tempTwo');
let temperatureThree = document.querySelector('.tempThree');
let temperatureFour = document.querySelector('.tempFour');
let temperatureFive = document.querySelector('.tempFive');

let descriptionOne = document.querySelector('.descriptionOne');
let descriptionTwo = document.querySelector('.descriptionTwo');
let descriptionThree = document.querySelector('.descriptionThree');
let descriptionFour = document.querySelector('.descriptionFour');
let descriptionFive = document.querySelector('.descriptionFive');

function setQuery(event){
if(event.keyCode == 13){
    getResults(searchbox.value);
    getFiveResults(searchbox.value);
    }
}

function getResults (city){
    fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
    .then(weather =>{
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    currentWeather(weather);
}

function currentWeather(weather){
    whole.classList.remove('hidden');
    let now = new Date();
    let time = timeBuilder(now);
        if(time >= 18 | time <= 6){
            bg.classList.add('night');
    }
    let city = document.querySelector('.location .city');
        city.innerText = `${weather.name}, ${weather.sys.country}`;
    let date = document.querySelector('.location .date');
        date.innerText = dateBuilder(now);
    let temp = document.querySelector('.current .temp');
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>&deg;c</span>`;
    let description = document.querySelector('.current .description');
        description.innerText = `${weather.weather[0].main}`;
    let hilo = document.querySelector('.current .temperatures');
    hilo.innerHTML = `${Math.round(weather.main.temp_max)}<span>&deg;c</span>/${Math.round(weather.main.temp_min)}<span>&deg;c</span>`;
}

function getFiveResults(city){
    fetch(`${api_five.base}?q=${city}&units=metric&APPID=${api_five.key}`)
    .then(weather_five =>{
        return weather_five.json();
    }).then(displayFiveResults);
}

function displayFiveResults(weather){
    console.log(weather);
    let newDate = new Date;
    let nextFiveDays = [newDate.getDay() + 1, newDate.getDay() + 2, newDate.getDay() + 3, newDate.getDay() + 4, newDate.getDay() + 5];
    
    nextFiveDays.forEach((day,index) => {
        if(day > 8){
            day = day%8 + 1;
        }else{
            null;
        }
            if (day == 8){
            nextFiveDays[index] = "Monday";
          }else if(day == 2) {
            nextFiveDays[index] = "Tuesday"; 
          } else if(day == 3) {
            nextFiveDays[index] = "Wednesday";
          } else if(day == 4) {
            nextFiveDays[index] = "Thursday"; 
          } else if(day == 5) {
            nextFiveDays[index] = "Friday"; 
          } else if(day == 6) {
            nextFiveDays[index] = "Saturday";
          } else if(day == 7) {
            nextFiveDays[index] = "Sunday"; 
         }
    });
    dayOne.innerText = nextFiveDays[0]; 
    dayTwo.innerText = nextFiveDays[1]; 
    dayThree.innerText = nextFiveDays[2]; 
    dayFour.innerText = nextFiveDays[3]; 
    dayFive.innerText = nextFiveDays[4]; 

    temperatureOne.innerHTML = `${Math.round(weather.list[4].main.temp)}<span>&deg;c</span>`;
    temperatureTwo.innerHTML = `${Math.round(weather.list[12].main.temp)}<span>&deg;c</span>`;
    temperatureThree.innerHTML = `${Math.round(weather.list[20].main.temp)}<span>&deg;c</span>`;
    temperatureFour.innerHTML = `${Math.round(weather.list[28].main.temp)}<span>&deg;c</span>`;
    temperatureFive.innerHTML = `${Math.round(weather.list[36].main.temp)}<span>&deg;c</span>`;

    descriptionOne.innerText = `${weather.list[4].weather[0].main}`;
    descriptionTwo.innerText = `${weather.list[12].weather[0].main}`;
    descriptionThree.innerText = `${weather.list[20].weather[0].main}`;
    descriptionFour.innerText = `${weather.list[28].weather[0].main}`;
    descriptionFive.innerText = `${weather.list[36].weather[0].main}`;

    
}

function dateBuilder (d){
    let months = ["January" , "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday",
    "Thursday","Friday","Saturday"];
    console.log(d.getDate());
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    if(minutes < 10){
        minutes = '0' + minutes;
    }
    return `${day}, ${date} ${month} ${year}, ${hours}:${minutes}`;

    
}

function timeBuilder (d){
    let hours = d.getHours();
    return hours;
}




