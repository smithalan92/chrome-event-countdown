<template>
  <div
    class="c-event-weather"
    v-if="weather">
      <weather-icon
        class="c-event-weather__icon"
        :icon="weather.icon"/>
      <span class="c-event-weather__text">{{ weather.summary }}</span>
      <span class="c-event-weather__text">{{ weather.temp }}</span>
      <span class="c-event-weather__city c-event-weather__text">
        in {{ eventCity.name }}, {{ eventCountry.name }}
      </span>
  </div>
</template>
<script src="./EventWeather.js"></script>
<style src="./EventWeather.scss" lang="scss"></style>
