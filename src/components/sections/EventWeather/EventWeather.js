/* eslint-disable func-names */
/* eslint-disable object-shorthand */

import axios from 'axios';
import WeatherIcon from './WeatherIcon';

export default {
  name: 'EventWeather',

  props: {
    eventCountry: {
      required: false,
    },

    eventCity: {
      required: false,
    },
  },

  components: {
    WeatherIcon,
  },

  data() {
    return {
      weather: null,
    };
  },

  methods: {
    async getCurrentWeather() {
      const { data } = await axios.get(`http://eventcountdownapi.mralansmith.com/api/weather/${this.eventCity.id}`);
      this.weather = data;
    },
  },

  watch: {
    'eventCity.id': function (newValue) {
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
    }
  },
};
