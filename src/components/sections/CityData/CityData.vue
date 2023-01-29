<template>
  <div v-if="weather" class="c-city-data">
    <weather-icon
      class="c-city-data__icon"
      :icon="weather.icon"
      :is-day="weather.isDay"
    />
    <span v-if="localTime" class="c-city-data__text">{{ localTime }}</span>
    <span class="c-city-data__text">{{ weather.summary }}</span>
    <span class="c-city-data__text">{{ weather.temp }}</span>
    <span class="c-city-data__city c-city-data__text">
      in {{ eventCity.name }}, {{ eventCountry.name }}
    </span>
  </div>
</template>
<script src="./CityData.js"></script>
<style src="./CityData.scss" lang="scss"></style>
