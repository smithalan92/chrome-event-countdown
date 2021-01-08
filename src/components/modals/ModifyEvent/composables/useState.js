import { computed, watch, reactive } from 'vue';

export default () => {
  const state = reactive({
    eventId: null,
    isVisible: false,
    eventName: '',
    eventDate: '',
    eventBackgroundImage: '',
    isOverlayVisible: false,
    countries: [],
    cities: [],
    selectedCountry: {},
    selectedCity: {},
  });

  const mode = computed(() => {
    if (state.eventId) return 'edit';
    return 'add';
  });

  watch(() => state.selectedCountry.id, (newId, oldId) => {
    if (newId !== oldId && oldId !== undefined) state.selectedCity = null;
    state.cities = [];
  });

  return {
    state,
    mode,
  };
};
