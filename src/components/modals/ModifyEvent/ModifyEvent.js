/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */

// TODO
// 1. Handle ESC keypress without vue-global-events

import { toRefs } from 'vue';
import vSelect from '@/components/widgets/VueSelect';
import CloseIcon from '@/assets/icons/close.svg';
import DatePicker from '@/components/widgets/DatePicker';

import '@/components/widgets/VueSelect/vue-select.scss';
import useState from './composables/useState';
import useFunctions from './composables/useFunctions';
import useHooks from './composables/useHooks';

export default {
  name: 'ModifyEvent',

  components: {
    DatePicker,
    CloseIcon,
    vSelect,
  },

  setup() {
    const { state, mode } = useState();
    const {
      open,
      close,
      onClickOutside,
      onClickCancel,
      onClickConfirm,
      loadCountries,
      loadCities,
    } = useFunctions(state, mode);

    useHooks(state, { open, loadCountries });

    const {
      isOverlayVisible,
      isVisible,
      eventName,
      countries,
      selectedCountry,
      cities,
      selectedCity,
      eventDate,
      eventBackgroundImage,
    } = toRefs(state);

    return {
      // State
      isOverlayVisible,
      isVisible,
      eventName,
      countries,
      selectedCountry,
      cities,
      selectedCity,
      eventDate,
      eventBackgroundImage,
      mode,
      // Functions
      open,
      close,
      onClickOutside,
      onClickCancel,
      onClickConfirm,
      loadCountries,
      loadCities,
    };
  },
};
