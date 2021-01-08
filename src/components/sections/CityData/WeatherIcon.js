import ClearDay from '@/assets/icons/weather/clear-day.svg';
import ClearNight from '@/assets/icons/weather/clear-night.svg';
import Cloudy from '@/assets/icons/weather/cloudy.svg';
import PartlyCloudyDay from '@/assets/icons/weather/partly-cloudy-day.svg';
import PartlyCloudyNight from '@/assets/icons/weather/partly-cloudy-night.svg';
import Rain from '@/assets/icons/weather/rain.svg';
import Snow from '@/assets/icons/weather/snow.svg';

export default {
  name: 'WeatherIcon',

  props: {
    icon: {
      type: String,
      required: true,
    },
  },

  render(h) {
    switch (this.icon) {
      case 'clear-day':
        return h(ClearDay);
      case 'clear-night':
        return h(ClearNight);
      case 'rain':
        return h(Rain);
      case 'snow':
        return h(Snow);
      case 'partly-cloudy-day':
        return h(PartlyCloudyDay);
      case 'partly-cloudy-night':
        return h(PartlyCloudyNight);
      default:
        return h(Cloudy);
    }
  },
};
