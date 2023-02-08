import { ref } from 'vue';
import { defineStore } from 'pinia';
import * as api from '../api/api';
import type { Country, City } from '../api/api.types';
import type { AxiosError } from 'axios';

let abortController: AbortController | null = null;

export const useGeoStore = defineStore('geo', () => {
  const countries = ref<Country[]>([]);
  const cities = ref<City[]>([]);
  const isLoadingCities = ref(false);

  const loadCountries = async () => {
    const data = await api.getCountries();
    countries.value = data.countries;
  };

  const loadCitiesForCountry = async ({ countryId, searchTerm }: { countryId: number; searchTerm: string }) => {
    isLoadingCities.value = true;
    abortController?.abort();
    abortController = new AbortController();
    try {
      const data = await api.getCitiesForCountry({
        countryId,
        searchTerm,
        signal: abortController.signal,
      });

      cities.value = data.cities;
      isLoadingCities.value = false;
    } catch (e) {
      console.log(e);
      if ((e as AxiosError)?.name === 'CanceledError') return;
      isLoadingCities.value = false;
      console.error(e);
    }
  };

  return {
    countries,
    cities,
    isLoadingCities,
    loadCountries,
    loadCitiesForCountry,
  };
});
