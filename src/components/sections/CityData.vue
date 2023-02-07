<template>
  <div
    v-if="weather"
    class="flex flex-col items-center absolute top-[100%] r-[calc(50%-100px)] w-52 pb-10 pt-4 bg-black/40 rounded-b-[30%]">
    <div class="w-full h-16 mb-2 flex items-center justify-center">
      <weather-icon class="my-2 w-12" :icon="weather.icon" :is-day="weather.isDay" />
    </div>
    <span class="py-[2px] px-3 text-center text-base">
      <span v-if="localTime">{{ localTime }} / </span>{{ weather.temp }}
    </span>
    <span class="py-[2px] px-3 text-center text-sm">{{ weather.summary }}</span>
    <span class="font-bold py-[2px] px-3 text-center text-sm"> in {{ eventCity.name }}, {{ eventCountry.name }} </span>
  </div>
</template>
<script setup lang="ts">
import moment from 'moment-timezone';
import { getWeatherForCity } from '../../api/api';
import WeatherIcon from '../widgets/WeatherIcon';
import { ref, watch, onMounted } from 'vue';
import type { GetWeatherForCityResponse, Country, City } from '@/api/api.types';

const props = defineProps<{
  eventCountry: Country;
  eventCity: City;
}>();

const weather = ref<GetWeatherForCityResponse | null>(null);
const localTime = ref('');

const getCurrentWeather = async () => {
  const data = await getWeatherForCity(props.eventCity.id);
  weather.value = data;
};

const triggerTimeUpdate = () => {
  localTime.value = moment().tz(props.eventCity.timezoneName).format('h:mma');

  setTimeout(() => {
    window.requestAnimationFrame(() => triggerTimeUpdate());
  }, 10000);
};

watch(props.eventCity, (newValue) => {
  if (newValue) {
    getCurrentWeather();
  } else {
    weather.value = null;
  }
});

onMounted(() => {
  if (props.eventCity) {
    getCurrentWeather();

    if (props.eventCity?.timezoneName) {
      triggerTimeUpdate();
    }
  }
});
</script>
