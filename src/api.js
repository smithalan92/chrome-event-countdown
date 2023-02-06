import axios from 'axios';
import format from 'date-fns/format';

const PRODUCTION_API_URL = 'https://eventcountdownapi.mralansmith.com/api';
const LOCAL_API_URL = 'http://localhost:3400/api';

const API_URL = process.env.NODE_ENV === 'development' ? LOCAL_API_URL : PRODUCTION_API_URL;

const http = axios.create({
  baseURL: API_URL,
});

export async function login({ email, password }) {
  const { data } = await http.post('/login', { email, password });

  return data;
}

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

export async function getAppData(authToken) {
  const { data } = await http.get(`/data`, {
    headers: {
      Authorization: authToken,
    },
  });

  return data;
}

export async function addEvent({ name, date, background, cityId }, { authToken }) {
  const { data } = await http.post(
    `/event`,
    {
      name,
      eventDate: format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss"),
      background,
      cityId,
    },
    {
      headers: {
        Authorization: authToken,
      },
    },
  );

  // Todo sort this out
  data.event.eventDate = new Date(data.event.eventDate);

  return data.event;
}

export async function updateEvent({ eventId, name, date, background, cityId }, { authToken }) {
  const { data } = await http.put(
    `/event/${eventId}`,
    {
      name,
      eventDate: format(new Date(date), "yyyy-MM-dd'T'HH:mm:ss"),
      background,
      cityId,
    },
    {
      headers: {
        Authorization: authToken,
      },
    },
  );

  // Todo sort this out
  data.event.eventDate = new Date(data.event.eventDate);

  return data.event;
}

export async function deleteEvent({ eventId }, { authToken }) {
  return http.delete(`/event/${eventId}`, {
    headers: {
      Authorization: authToken,
    },
  });
}

export async function reorderEvents({ eventIds }, { authToken }) {
  const { data } = await http.put(
    `/events/reorder`,
    {
      eventIds,
    },
    {
      headers: {
        Authorization: authToken,
      },
    },
  );

  return data.events;
}
