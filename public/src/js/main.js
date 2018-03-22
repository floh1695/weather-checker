const API_URL = 'http://api.openweathermap.org/data/2.5/weather?';
const API_KEY = 'f4d19a80c743b8354ac723b2953fa90b';
const apiArg = () => {
  return `&appid=${API_KEY}`;
};

const appendToDataLog = (textContent) => {
  const dataLog = document.querySelector('#dataLog');
  const _p = document.createElement('p');
  _p.textContent = textContent;
  dataLog.appendChild(_p);
};

const generateApiCommand = (searchQuery) => {
  let fetchMe = API_URL;
  if (isNaN(searchQuery)) {
    console.log('checking for city:', searchQuery);
    fetchMe += 'q=' + searchQuery;
  } else {
    console.log('checking for zip:', searchQuery);
    fetchMe += 'zip=' + searchQuery;
  }
  fetchMe += apiArg();
  return fetchMe;
};

const checkWeather = () => {
  const cityName = document.querySelector('#searchBar').value;
  let fetchMe = generateApiCommand(cityName);

  console.log('fetching:', fetchMe);
  const handleResponse = (response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.warn('Response failed:', response.status);
    }
  };

  const handleData = (data) => {
    console.log('data:', data);
    appendToDataLog(`${data.name} -- Temp: ${((9 / 5) * (data.main.temp - 273) + 32).toFixed(2)} \u00b0F`);
  };

  fetch(fetchMe).then(handleResponse).then(handleData);
};

const searchButtonConfig = () => {
  const searchButton = document.querySelector('#searchButton');
  const listener = (event) => {
    event.preventDefault();
    console.log('searchButton -> click listener');
    checkWeather();
  };
  searchButton.addEventListener('click', listener);
};

const main = () => {
  searchButtonConfig();
};

document.addEventListener('DOMContentLoaded', main);
