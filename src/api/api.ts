import axios from 'axios';
import format from 'date-fns/format';
import type {
  GetCountriesResponse,
  LoginResponse,
  GetCitiesForCountryResponse,
  GetAppDataResponse,
  GetWeatherForCityResponse,
  AddEventResponse,
  UpdateEventResponse,
  ReorderEventsResponse,
  AddNoteBody,
  RequestOptions,
  AddNoteResponse,
  GetNotesResponse,
  UpdateNoteParams,
  UpdateNoteResponse,
  DeleteNoteParams,
} from './api.types';

const PRODUCTION_API_URL = 'https://eventcountdownapi.mralansmith.com/api';
const LOCAL_API_URL = 'http://localhost:3400/api';

const API_URL = process.env.NODE_ENV === 'development' ? LOCAL_API_URL : PRODUCTION_API_URL;

const http = axios.create({
  baseURL: API_URL,
});

export async function login({ email, password }: { email: string; password: string }) {
  const { data } = await http.post<LoginResponse>('/login', { email, password });

  return data;
}

export async function getCountries() {
  const { data } = await http.get<GetCountriesResponse>('/countries');
  return data;
}

export async function getCitiesForCountry({ countryId, searchTerm, signal }: { countryId: number; searchTerm: string; signal: any }) {
  const params: Record<string, string | number> = { limit: 15 };

  if (searchTerm) {
    params.searchTerm = searchTerm;
  }

  const { data } = await http.get<GetCitiesForCountryResponse>(`/countries/${countryId}/cities`, {
    signal,
    params,
  });

  return data;
}

export async function getWeatherForCity(cityId: number) {
  const { data } = await http.get<GetWeatherForCityResponse>(`/weather/${cityId}`);
  return data;
}

export async function getAppData(authToken?: string) {
  const { data } = await http.get<GetAppDataResponse>(`/data`, {
    headers: {
      Authorization: authToken,
    },
  });

  return data;
}

export async function addEvent(
  { name, date, background, cityId }: { name: string; date: string; background: string; cityId: number },
  { authToken }: RequestOptions,
) {
  const { data } = await http.post<AddEventResponse>(
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

export async function updateEvent(
  { eventId, name, date, background, cityId }: { eventId: number; name: string; date: string; background: string; cityId: number },
  { authToken }: RequestOptions,
) {
  const { data } = await http.put<UpdateEventResponse>(
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

export async function deleteEvent({ eventId }: { eventId: number }, { authToken }: RequestOptions) {
  return http.delete(`/event/${eventId}`, {
    headers: {
      Authorization: authToken,
    },
  });
}

export async function reorderEvents({ eventIds }: { eventIds: number[] }, { authToken }: RequestOptions) {
  const { data } = await http.put<ReorderEventsResponse>(
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

export async function getNotes({ authToken }: RequestOptions) {
  const { data } = await http.get<GetNotesResponse>(`/notes`, {
    headers: {
      Authorization: authToken,
    },
  });

  return data.notes;
}

export async function addNote({ text }: AddNoteBody, { authToken }: RequestOptions) {
  const { data } = await http.post<AddNoteResponse>(
    `/notes`,
    {
      text,
    },
    {
      headers: {
        Authorization: authToken,
      },
    },
  );

  return data.note;
}

export async function updateNote({ id, text }: UpdateNoteParams, { authToken }: RequestOptions) {
  const { data } = await http.put<UpdateNoteResponse>(
    `/notes/${id}`,
    {
      text,
    },
    {
      headers: {
        Authorization: authToken,
      },
    },
  );

  return data.note;
}

export async function deleteNote({ id }: DeleteNoteParams, { authToken }: RequestOptions) {
  await http.delete(`/notes/${id}`, {
    headers: {
      Authorization: authToken,
    },
  });
}
