import axios from 'axios';

const PRODUCTION_API_URL = 'https://eventcountdownapi.mralansmith.com/api';
const LOCAL_API_URL = 'http://localhost:3400/api';

const API_URL = process.env.NODE_ENV !== 'development' ? LOCAL_API_URL : PRODUCTION_API_URL;

const http = axios.create({
  baseURL: API_URL,
});

export async function getCountries() {
  const { data } = await http.get('/countries');
  return data;
}

export async function getCitiesForCountry({ countryId, searchTerm, signal }) {
  const params = { limit: 15 };

  if (searchTerm) {
    params.searchTerm = searchTerm;
  }

  const { data } = await http.get(`/countries/${countryId}/cities`, {
    signal,
    params,
  });

  return data;
}

export async function getWeatherForCity(cityId) {
  const { data } = await http.get(`/weather/${cityId}`);
  return data;
}
