const WeatherKey = "";
let units = 'metric';
let searchMethod;
var countryCode = "uk";
var mancStops = [
    "Victoria",
    "Airport",
    "St Peters Square"
];
var salStops = [
    "MediaCityUK"
];
var ashStops = [
    "Ashton-under-Lyne"
];

//this will get the text entered into the search box and determine whether you are searching a place or post code
function getSearchMethod(searchTerm) {
    //if you meet the requirements of a US ZIP Code then search with zip, otherwise use query
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
    //i could just enforce only query searches and not zip but this leaves it open for further development easier
        searchMethod = 'q';
}

function searchWeather(searchTerm){
    //this clears the output area so that you only get one search result at a time
    //maybe there is a benefit for stacking search results if you want to compare stops
    //but for now this just keeps the page looking nicer
    goodbyeSearch();
    //gets whether youre seaching a query or zipcode
    getSearchMethod(searchTerm);


    //this then takes what you are entering into the box
    //separates everything after the word 'to'
    let uwuWhatsThis = searchTerm.split('to').pop();

    //i was planning to use the numbers at the end of the lines to search but changed plan. Keep this incase you need it later?
    let theNumbersMason = parseInt(uwuWhatsThis, 10);
    //removes the spaces
    let words = searchTerm.split(' ');
    //counts the words
    let wordNumber = words.length - 2;
    //converts the text to a string, for some reason it wont work if you dont, it being a string by default doesnt work
    let pleaseWork = words[wordNumber].toString();
    //the below then checks against the above arrays and returns a true/false if they are included
    let mancStopCheck = mancStops.includes(pleaseWork);
    let salStopCheck = salStops.includes(pleaseWork);

    //this uses the true/false to make the weather search return a searchable area by the API
    if(mancStopCheck == true) {
        var searchTerm = "Manchester";
        console.log(searchTerm);
    }
    if(salStopCheck == true){
        var searchTerm = "Salford";
    }
    else
        searchTerm = "Manchester"

    console.log(searchTerm);


    //this sends the request out
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm},uk&APPID=${WeatherKey}&units=${units}`)
        .then((result) => {
            //console.log(result.json());
            return result.json();
            })
            .then((res) => {
                init(res);
                console.log(res);
    });
}

//this controls the background image
function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = "url('weatherImages/clear.jpg')";
            break;
        
        case 'Clouds':
            document.body.style.backgroundImage = "url('weatherImages/cloudy.jpg')";
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = "url('weatherImages/rain.jpg')";
            break;
        
        case 'Thunderstorm':
            document.body.style.backgroundImage = "url('weatherImages/storm.jpg')";
            break;
        
        case 'Snow':
            document.body.style.backgroundImage = "url('weatherImages/snow.jpg')";
            break;

        default:
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');

    let weatherIcon = document.getElementById('documentIconImg');
    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176;';
    windSpeedElement.innerHTML = 'Winds at  ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity +  '%';

    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('btnSearch').addEventListener('click', () => {
    let searchTerm = document.getElementById('search').value;
        if (searchTerm == "") {
            searchTerm = document.getElementById('search1').value;
            return searchTerm
        }
        setTimeout(400)
        searchWeather(searchTerm);
});

document.getElementById('btnSearch1').addEventListener('click', () => {
    let searchTerm = document.getElementById('search1').value;
       setTimeout(searchWeather(searchTerm), 4500)
});


function goodbyeSearch(){
    document.getElementById("bottle").innerHTML = ""; 
}
