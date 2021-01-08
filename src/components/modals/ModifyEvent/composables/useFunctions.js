import { nextTick } from 'vue';
import axios from 'axios';
import throttle from 'lodash/throttle';
import { useStore } from 'vuex';

const { CancelToken } = axios;
let currentCancelToken = null;

function validateInput(state) {
  if (state.eventName === '') return false;
  if (state.eventDate === '') return false;
  if (state.selectedCountry && !state.selectedCity) return false;

  if (state.eventBackgroundImage.endsWith('.png')
    || state.eventBackgroundImage.endsWith('.jpg')
    || state.eventBackgroundImage.endsWith('.jpeg')
    || state.eventBackgroundImage.endsWith('.gif')
  ) return true;

  if (state.eventBackgroundImage === '') {
    state.eventBackgroundImage = 'https://picsum.photos/1200/800';
  }

  return true;
}

export default (state, mode) => {
  const store = useStore();

  const open = () => {
    state.isOverlayVisible = true;
    state.isVisible = true;
  };

  const close = async () => {
    state.isVisible = false;
    await nextTick();
    state.isOverlayVisible = false;
    state.eventId = null;
    state.eventName = '';
    state.eventDate = '';
    state.eventBackgroundImage = '';
    state.selectedCountry = {};
    state.selectedCity = {};
  };

  const onClickOutside = (e) => {
    // This is a nasty hack as we cant use appendTo in the config props
    // to get flatPicker appending to an EL inside the modal due to using v-if
    // which means no refs available. This prevents changing the date/time closing
    // the modal
    const [flatPickrEl] = document.getElementsByClassName('flatpickr-calendar');
    if (!e.path.includes(flatPickrEl)) close();
  };

  const onClickAdd = () => {
    if (!validateInput(state)) {
      console.log('invalid input');
      return;
    }

    const date = new Date(state.eventDate);
    const newEventId = Math.floor(Math.random() * Date.now());

    store.dispatch('addEvent', {
      eventId: newEventId,
      eventName: state.eventName,
      eventDate: date,
      background: state.eventBackgroundImage,
      eventCountry: state.selectedCountry,
      eventCity: state.selectedCity,
    });

    close();
  };

  const onClickEdit = () => {
    if (!validateInput()) {
      console.log('invalid input');
      return;
    }

    const date = new Date(state.eventDate);

    store.dispatch('updateEvent', {
      eventId: state.eventId,
      eventName: state.eventName,
      eventDate: date,
      background: state.eventBackgroundImage,
      eventCountry: state.selectedCountry,
      eventCity: state.selectedCity,
    });

    close();
  };

  const onClickCancel = () => {
    close();
  };

  const onClickConfirm = () => {
    if (mode.value === 'add') {
      onClickAdd();
    } else {
      onClickEdit();
    }
  };

  const loadCountries = async () => {
    const { data } = await axios.get('http://eventcountdownapi.mralansmith.com/api/countries');
    state.countries = data.countries;
  };

  const loadCities = throttle(async (search) => {
    try {
      if (!state.selectedCountry) return;
      if (currentCancelToken) currentCancelToken.cancel('Cancelling old request');
      currentCancelToken = CancelToken.source();
      if (!search) return;
      // loading(true);
      const params = { limit: 15 };
      if (search) params.searchTerm = search;

      const { data } = await axios.get(`http://eventcountdownapi.mralansmith.com/api/countries/${state.selectedCountry.id}/cities`, {
        cancelToken: currentCancelToken.token,
        params,
      });

      state.cities = data.cities;
      // loading(false);
    } catch (error) {
      if (!axios.isCancel(error)) {
        // loading(false);
        console.error(error);
      }
    }
  }, 200, { leading: false, trailing: true });

  return {
    open,
    close,
    onClickOutside,
    onClickCancel,
    onClickConfirm,
    loadCountries,
    loadCities,
  };
};
