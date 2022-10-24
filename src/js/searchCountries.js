import '../sass/index.scss';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

// import "./css/style.css";

const countryName = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

var load = debounce(function (data) {
  //   console.log(data);
  fetchCountries(data)
    .then(country => {
      if (country.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
      } else renderCountryInfo(country);
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    });
}, DEBOUNCE_DELAY);

countryName.addEventListener('input', event => {
  if (event.currentTarget.value === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  } else load(event.currentTarget.value.trim());
});

function renderCountryInfo(countries) {
  let markup = '';
  if (countries.length === 0) {
    countryList.innerHTML = '';
  } else if (countries.length === 1) {
    countryList.innerHTML = '';
    markup = countries
      .map(country => {
        return `
       <p> <img src="${country.flags.svg}" alt="" width=50 height=30>
        <b class="countyName">${country.name.common}</b></p>

        <p>  <b>Capital</b> : ${country.capital} </p>

        <p>  <b>Population</b> : ${country.population} </p>
    
         <p> <b>languages</b> : ${Object.values(country.languages)}</p>
        
      `;
      })
      .join('');
    countryInfo.innerHTML = markup;
  } else {
    countryInfo.innerHTML = '';
    markup = countries
      .map(country => {
        return `<li><img src="${country.flags.svg}" alt="" width=30 height=30>
        ${country.name.common}
        </li>
      `;
      })
      .join('');
    countryList.innerHTML = markup;
    // countryList.style.cssText += 'border: 1px solid blue';
  }
}
