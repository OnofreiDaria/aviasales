const formSearch = document.querySelector('.form-search');
const inputCitiesFrom = formSearch.querySelector('.input__cities-from');
const dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from');
const inputCitiesTo = formSearch.querySelector('.input__cities-to');
const dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to');
const inputDateDepart = formSearch.querySelector('.input__date-depart');

const citiesApi = 'database/cities.json';
const proxy = 'https://cors-anywhere.herokuapp.com/';
const API_KEY = 'f68c15414887b92feb26d8deb52d7e42';
const calendar = 'http://min-prices.aviasales.ru/calendar_preload';

let city = [];

// функции

const getData = (url, callback) => {
  const request = new XMLHttpRequest();

  request.open('GET', url);

  request.addEventListener('readystatechange', () => {
    if (request.readyState !== 4) return;

    if (request.status === 200) {
      callback(request.response);
    } else {
      console.error(request.status);
    }
  });

  request.send();
};

const showCity = (input, list) => {
  list.textContent = '';

  if (input.value !== '') {
    const filterCity = city.filter((item) => {
      const fixItem = item.name.toLowerCase();
      return fixItem.startsWith(input.value.toLowerCase());
    });

    filterCity.forEach((item) => {
      const li = document.createElement('li');
      li.classList.add('​dropdown__city');
      li.textContent = item.name;
      list.append(li);
    });
  }
};

const selectCity = (event, input, list) => {
  const target = event.target;
  if (target.tagName.toLowerCase() === 'li') {
    input.value = target.textContent;
    list.textContent = '';
  }
};

const renderCheapDay = (cheapTicket) => {
  console.log(cheapTicket);
};

const renderCheapYear = (cheapTickets) => {
  cheapTickets.sort( (a, b) => a.value - b.value);

  console.log(cheapTickets);
};

const renderCheap = (data, date) => {
  const cheapTicketYear = JSON.parse(data).best_prices;

  const cheapTicketDay = cheapTicketYear.filter((item) => {
    return item.depart_date === date;
  })
  renderCheapDay(cheapTicketDay);
  renderCheapYear(cheapTicketDay);
}


// обработчики событий

inputCitiesFrom.addEventListener('input', () => {
  showCity(inputCitiesFrom, dropdownCitiesFrom);
});

inputCitiesTo.addEventListener('input', () => {
  showCity(inputCitiesTo, dropdownCitiesTo);
});

dropdownCitiesFrom.addEventListener('click', (event) => {
  selectCity(event, inputCitiesFrom, dropdownCitiesFrom);
});

dropdownCitiesTo.addEventListener('click', (event) => {
  selectCity(event, inputCitiesTo, dropdownCitiesTo);
});

formSearch.addEventListener('submit', (event) => {
  event.preventDefault();

  const cityFrom = city.find(item => inputCitiesFrom.value === item.name);
  const cityTo = city.find(item => inputCitiesTo.value === item.name);

  const formData = {
    from: cityFrom,
    to: cityTo,
    when: inputDateDepart.value,
  }

  if (formData.from && formData.to) {
    const requestData = `?depart_date=${formData.when}&origin=${formData.from.code}&destination=${formData.to.code}&one_way=true&token=${API_KEY}`;

    getData(calendar + requestData, (response) => {
      renderCheap(response, formData.when);
    });
  } else {
    alert('Введите корректное название города');
  }



});

// call functions
getData(citiesApi, (data) => {
  city = JSON.parse(data).filter(item => item.name);

  city.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  })
  console.log(city);
});
