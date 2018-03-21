const siteHead = 'http://api.openweathermap.org/data/2.5/weather?';
const apiKey = 'f4d19a80c743b8354ac723b2953fa90b';
const apiArg = () => {
  return `&appid=${apiKey}`;
};

const appendToDataLog = (textContent) => {
  const dataLog = document.querySelector('#dataLog');
  const _p = document.createElement('p');
  _p.textContent = textContent;
  dataLog.appendChild(_p);
};

const checkWeather = () => {
  const cityName = document.querySelector('#searchBar').value;
  
  let fetchMe;
  if (isNaN(cityName)) {
    console.log('checking for city:', cityName);
    fetchMe = `${siteHead}q=${cityName}${apiArg()}`;
  } else {
    console.log('checking for zip:', cityName);
    fetchMe = `${siteHead}zip=${cityName}${apiArg()}`;
  }

  console.log('fetching:', fetchMe);

  const handleResponse = (response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.warn('Response failed');
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
