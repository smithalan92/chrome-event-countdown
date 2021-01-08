import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default (state, functions) => {
  const store = useStore();

  onMounted(() => {
    functions.loadCountries();

    store.subscribeAction((action) => {
      const { payload, type } = action;
      if (type === 'openAddEventModal') {
        if (payload) {
          state.eventId = payload.eventId;
          state.eventName = payload.eventName;
          state.eventDate = payload.eventDate;
          state.selectedCountry = payload.eventCountry;
          state.selectedCity = payload.eventCity;
          state.eventBackgroundImage = payload.eventBackgroundImage;
        }

        functions.open();
      }
    });
  });
};
