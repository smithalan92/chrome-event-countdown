import Cloudy from '@/assets/icons/weather/cloudy.svg';
import Fog from '@/assets/icons/weather/fog.svg';
import PartlyCloudy from '@/assets/icons/weather/partly_cloudy.svg';
import Rain from '@/assets/icons/weather/rain.svg';
import Snow from '@/assets/icons/weather/snow.svg';
import ClearDay from '@/assets/icons/weather/clear_day.svg';
import ClearNight from '@/assets/icons/weather/clear_night.svg';
import Thunder from '@/assets/icons/weather/thunder.svg';

export default {
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

  render(h) {
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
};
