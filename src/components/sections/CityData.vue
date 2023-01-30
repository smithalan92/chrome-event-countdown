<template>
  <div
    v-if="weather"
    class="flex flex-col items-center absolute top-[100%] r-[calc(50%-100px)] w-52 pb-10 pt-4 bg-black/40 rounded-b-[30%]"
  >
    <div class="w-full h-16 mb-2 flex items-center justify-center">
      <weather-icon
        class="my-2 w-12"
        :icon="weather.icon"
        :is-day="weather.isDay"
      />
    </div>
    <span class="py-[2px] px-3 text-center text-base">
      <span v-if="localTime">{{ localTime }} / </span>{{ weather.temp }}
    </span>
    <span class="py-[2px] px-3 text-center text-sm">{{ weather.summary }}</span>
    <span class="font-bold py-[2px] px-3 text-center text-sm">
      in {{ eventCity.name }}, {{ eventCountry.name }}
    </span>
  </div>
</template>
<script>
/* eslint-disable vue/require-default-prop */
/* eslint-disable vue/require-prop-types */
import axios from "axios";
import moment from "moment-timezone";
import WeatherIcon from "../widgets/WeatherIcon";

// @vue/component
export default {
  name: "CityData",

  components: {
    WeatherIcon,
  },

  props: {
    eventCountry: {
      required: false,
    },

    eventCity: {
      required: false,
    },
  },

  data() {
    return {
      weather: null,
      triggerInt: true,
      localTime: "",
    };
  },

  watch: {
    "eventCity.id": function (newValue) {
      if (newValue) {
        this.getCurrentWeather();
      } else {
        this.weather = null;
      }
    },
  },

  mounted() {
    if (this.eventCity) {
      this.getCurrentWeather();

      if (this.eventCity.timezoneName) {
        this.triggerTimeUpdate();
      }
    }
  },

  methods: {
    async getCurrentWeather() {
      const { data } = await axios.get(
        `http://eventcountdownapi.mralansmith.com/api/weather/${this.eventCity.id}`
      );
      this.weather = data;
    },

    triggerTimeUpdate() {
      this.localTime = moment().tz(this.eventCity.timezoneName).format("h:mma");

      setTimeout(() => {
        window.requestAnimationFrame(() => this.triggerTimeUpdate());
      }, 10000);
    },
  },
};
</script>
