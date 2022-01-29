const api={
    key:"0cbb408d67d6e0c41879aa42201e34fe",
    base:"https://api.openweathermap.org/data/2.5/"
}

const dateBuilder=(d)=>{
    let months=["January","February","March","April","May","June","July","August"
                ,"September","October","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day=days[d.getDay()];
    let date = d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

// used to display the results fetched from the API into the page
const displayResults = (weather)=>{
    console.log(weather);
    // console.log(weather);
    // fetch the city element 
    let city=document.querySelector('.location .city');
    // set the innerText of city element to the city name 
    // given in the searchbox
    city.innerText=`${weather.name}, ${weather.sys.country}`;
    // fetch the date
    let now=new Date();
    // fetch the date HTML element
    let date = document.querySelector('.date');
    // call the funciton to get the date in out format
    date.innerText=dateBuilder(now);
    // Fetch the temp element
    let temp = document.querySelector('.temp');
    // Display the temp by rounding it to zero and adding °C to it
    temp.innerHTML=`${Math.round(weather.main.temp).toFixed(0)}<span>°C</span>`
    // fetch the weather element, sunny, raainy, etc
    let weather_el = document.querySelector('.weather');
    // display the weather from the API's JSON 
    weather_el.innerText=weather.weather[0].main;
    // fecth the hilow element
    let hilow= document.querySelector('.hi-low');
    // display the value from the API
    hilow.innerText=`${Math.round(weather.main.temp_min).toFixed(0)}°C / ${Math.round(weather.main.temp_max).toFixed(0)} °C`;
}

// gets called when enter key is pressed inside searchbox
// calls the API to get the result
const getResults = (query)=>{
    // call the api with base url and query (city name)
    // unit is to specify that we need temperature in celcius
    // app id is the key of api
    
    if(query==""){
        query="Ahmedabad";
    }
    fetch (`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    // if the fetching is successfull then return the fetched object from the API
    // and call the displayResults function
    .then(weather=>{
        return weather.json();
    }).then(displayResults);
}


// called each time a key is pressed and checks for enterkey
// calls the getResult function
const setQuery = (e)=>{
    // chekc if the enter key was pressed
    if(e.keyCode==13){
        // if yes then call the getResult with the city name fetched from 
        // searchbox
        getResults(searchBox.value);
        // console.log(searchBox.value)
    }
}

// find the searchbox element
const searchBox = document.querySelector('.search-box');
// add an event listener that runs a funciton everytime a key is 
// pressed in the searchbox
searchBox.addEventListener('keypress',setQuery);

window.onload=function(){
    if(sessionStorage.getItem("firstTime")==null){
        getResults("Ahmedabad");
        sessionStorage.setItem("firstTime","Yes"); 
    }
}