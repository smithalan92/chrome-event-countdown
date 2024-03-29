import Cloudy from '../../assets/icons/weather/cloudy.svg?component';
import Fog from '../../assets/icons/weather/fog.svg?component';
import PartlyCloudy from '../../assets/icons/weather/partly_cloudy.svg?component';
import Rain from '../../assets/icons/weather/rain.svg?component';
import Snow from '../../assets/icons/weather/snow.svg?component';
import ClearDay from '../../assets/icons/weather/clear_day.svg?component';
import ClearNight from '../../assets/icons/weather/clear_night.svg?component';
import Thunder from '../../assets/icons/weather/thunder.svg?component';
import { defineComponent, h } from 'vue';

// @vue/component
export default defineComponent({
  name: 'WeatherIcon',

  props: {
    icon: {
      type: String,
      required: true,
    },
    isDay: {
      type: Boolean,
      required: true,
    },
  },

  render() {
    switch (this.icon) {
      case 'clear':
        return this.isDay ? h(ClearDay) : h(ClearNight);
      case 'partly_cloudy':
        return this.isDay ? h(PartlyCloudy) : h(Cloudy);
      case 'cloudy':
        return h(Cloudy);
      case 'rain':
        return h(Rain);
      case 'snow':
        return h(Snow);
      case 'thunder':
        return h(Thunder);
      case 'fog':
        return h(Fog);
      default:
        return h(Cloudy);
    }
  },
});
