export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUser {
  id: number;
  email: string;
}

export interface LoginResponse {
  user: LoginUser;
  token: string;
}

export interface Country {
  id: number;
  name: string;
}

export interface GetCountriesResponse {
  countries: Country[];
}

export interface City {
  id: number;
  name: string;
  timezoneName: string;
}

export interface GetCitiesForCountryResponse {
  cities: City[];
}

export interface GetWeatherForCityResponse {
  summary: string;
  icon: string;
  isDay: boolean;
  temp: string;
  tempFeel: string;
  windKph: number;
}

export interface Event {
  id: number;
  name: string;
  eventDate: Date;
  order: number;
  background: string;
  city: City;
  country: Country;
}

export interface GetAppDataResponse {
  events: Event[];
}

export interface AddEventResponse {
  event: Event;
}

export type UpdateEventResponse = AddEventResponse;
export type ReorderEventsResponse = GetAppDataResponse;

export interface Note {
  id: number;
  text: string;
}

export interface GetNotesResponse {
  notes: Note[];
}

export interface AddNoteBody {
  text: string;
}

export interface AddNoteResponse {
  note: Note;
}

export interface UpdateNoteParams {
  id: number;
  text: string;
}

export interface UpdateNoteResponse {
  note: Note;
}

export interface DeleteNoteParams {
  id: number;
}

export interface RequestOptions {
  authToken?: string;
}
