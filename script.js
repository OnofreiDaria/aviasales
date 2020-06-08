
const formSearch = document.querySelector('.form-search');
const inputCitiesFrom = formSearch.querySelector('.input__cities-from');
const dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from');
const inputCitiesTo = formSearch.querySelector('.dropdown__cities-to');
const dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to');

const city = ['Moscow', 'Amsterdam', 'Chisinau', 'Prague', 'Paris', 'San-Francisco',
'London', 'Kiev', 'Roma', 'Tel-Aviv'];

inputCitiesFrom.addEventListener('input', () => {


