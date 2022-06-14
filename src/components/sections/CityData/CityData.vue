<template>
  <div
    class="c-city-data"
    v-if="weather">
      <weather-icon
        class="c-city-data__icon"
        :icon="weather.icon" :is-day="weather.isDay"/>
      <span
        class="c-city-data__text"
        v-if="localTime">{{ localTime }}</span>
      <span class="c-city-data__text">{{ weather.summary }}</span>
      <span class="c-city-data__text">{{ weather.temp }}</span>
      <span class="c-city-data__city c-city-data__text">
        in {{ eventCity.name }}, {{ eventCountry.name }}
      </span>
  </div>
</template>
<script src="./CityData.js"></script>
<style src="./CityData.scss" lang="scss"></style>
