const api={
    key:"7d13cd2c254074eca62c084c97b424d1",
    base:"https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search');
searchbox.addEventListener('keypress',setQuery);

var whole = document.querySelector('.main');
whole.classList.add('hidden');


function setQuery(event){
if(event.keyCode == 13){
    getResults(searchbox.value);
    
    }
}

function getResults (query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather =>{
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    whole.classList.remove('hidden');
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>&deg;c</span>`;

    let description = document.querySelector('.current .description');
    description.innerText = `${weather.weather[0].main}`;

    let hilo = document.querySelector('.current .temperatures');
    hilo.innerHTML = `${Math.round(weather.main.temp_max)}<span>&deg;c</span>/${Math.round(weather.main.temp_min)}<span>&deg;c</span>`;
}

function dateBuilder (d){
    let months = ["January" , "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November","December"];
    let days = ["Saturday","Sunday","Monday","Tuesday","Wednesday",
    "Thursday","Friday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

