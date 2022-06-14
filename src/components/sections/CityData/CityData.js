/* eslint-disable */

import axios from "axios";
import moment from "moment-timezone";
import WeatherIcon from "./WeatherIcon";

export default {
  name: "CityData",

  props: {
    eventCountry: {
      required: false
    },

    eventCity: {
      required: false
    }
  },

  components: {
    WeatherIcon
  },

  data() {
    return {
      weather: null,
      triggerInt: true,
      localTime: ""
    };
  },

  methods: {
    async getCurrentWeather() {
      const { data } = await axios.get(
        `http://localhost:3400/api/weather/${this.eventCity.id}`
      );
      this.weather = data;
    },

    triggerTimeUpdate() {
      this.localTime = moment()
        .tz(this.eventCity.timezoneName)
        .format("h:mma");

      setTimeout(() => {
        window.requestAnimationFrame(() => this.triggerTimeUpdate());
      }, 10000);
    }
  },

  watch: {
    "eventCity.id": function(newValue) {
      if (newValue) {
        this.getCurrentWeather();
      } else {
        this.weather = null;
      }
    }
  },

  mounted() {
    if (this.eventCity) {
      this.getCurrentWeather();

      if (this.eventCity.timezoneName) {
        this.triggerTimeUpdate();
      }
    }
  }
};
