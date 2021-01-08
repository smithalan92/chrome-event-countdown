/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */

// TODO
// 1. Handle ESC keypress without vue-global-events

import axios from 'axios';
import vSelect from '@/components/widgets/VueSelect';
import throttle from 'lodash/throttle';
import CloseIcon from '@/assets/icons/close.svg';
import DatePicker from '@/components/widgets/DatePicker';

import '@/components/widgets/VueSelect/vue-select.scss';

const { CancelToken } = axios;
let currentCancelToken = null;

export default {
  name: 'ModifyEvent',

  components: {
    DatePicker,
    CloseIcon,
    vSelect,
  },

  data() {
    return {
      eventId: null,
      isVisible: false,
      eventName: '',
      eventDate: '',
      eventBackgroundImage: '',
      isOverlayVisible: false,
      countries: [],
      cities: [],
      selectedCountry: null,
      selectedCity: null,
      citySearchTerm: '',
      isSearching: false,
      cityOffset: 0,
      flatPickrConfig: {
        dateFormat: 'd M Y H:i',
        minDate: new Date().toISOString(),
        enableTime: true,
        appendTo: this.$refs.datepicker,
        time_24hr: true,
      },
    };
  },

  computed: {
    mode() {
      if (this.eventId) return 'edit';
      return 'add';
    },
  },

  watch: {
    'selectedCountry.id': function (newId, oldId) {
      if (newId !== oldId && oldId !== undefined) this.selectedCity = null;
      this.cities = [];
    },
  },

  methods: {
    async open() {
      this.isOverlayVisible = true;
      await this.$nextTick();
      this.isVisible = true;
      if (this.$refs.name) this.$refs.name.focus();
    },

    onClickOutside(e) {
      // This is a nasty hack as we cant use appendTo in the config props
      // to get flatPicker appending to an EL inside the modal due to using v-if
      // which means no refs available. This prevents changing the date/time closing
      // the modal
      const [flatPickrEl] = document.getElementsByClassName('flatpickr-calendar');
      if (!e.path.includes(flatPickrEl)) this.close();
    },

    async close() {
      this.isVisible = false;
      await this.$nextTick();
      this.isOverlayVisible = false;
      this.eventId = null;
      this.eventName = '';
      this.eventDate = '';
      this.eventBackgroundImage = '';
      this.selectedCountry = null;
      this.selectedCity = null;
    },

    onClickConfirm() {
      if (this.mode === 'add') {
        this.onClickAdd();
      } else {
        this.onClickEdit();
      }
    },

    onClickAdd() {
      if (!this.validateInput()) {
        console.log('invalid input');
        return;
      }

      const date = new Date(this.eventDate);
      const newEventId = this.generateEventId();

      this.$store.dispatch('addEvent', {
        eventId: newEventId,
        eventName: this.eventName,
        eventDate: date,
        background: this.eventBackgroundImage,
        eventCountry: this.selectedCountry,
        eventCity: this.selectedCity,
      });

      this.close();
    },

    onClickEdit() {
      if (!this.validateInput()) {
        console.log('invalid input');
        return;
      }

      const date = new Date(this.eventDate);

      this.$store.dispatch('updateEvent', {
        eventId: this.eventId,
        eventName: this.eventName,
        eventDate: date,
        background: this.eventBackgroundImage,
        eventCountry: this.selectedCountry,
        eventCity: this.selectedCity,
      });

      this.close();
    },

    generateEventId() {
      return Math.floor(Math.random() * Date.now());
    },

    validateInput() {
      if (this.eventName === '') return false;
      if (this.eventDate === '') return false;
      if (this.selectedCountry && !this.selectedCity) return false;

      if (this.eventBackgroundImage.endsWith('.png')
        || this.eventBackgroundImage.endsWith('.jpg')
        || this.eventBackgroundImage.endsWith('.jpeg')
        || this.eventBackgroundImage.endsWith('.gif')
      ) return true;

      if (this.eventBackgroundImage === '') {
        this.eventBackgroundImage = 'https://picsum.photos/1200/800';
      }

      return true;
    },

    onClickCancel() {
      this.close();
    },

    async loadCountries() {
      const { data } = await axios.get('http://eventcountdownapi.mralansmith.com/api/countries');
      this.countries = data.countries;
    },

    throttledLoadCities: throttle(async (search, self) => {
      try {
        if (currentCancelToken) currentCancelToken.cancel('Cancelling old request');
        currentCancelToken = CancelToken.source();
        if (!search) return;
        // loading(true);
        const params = { limit: 15 };
        if (search) params.searchTerm = search;

        const { data } = await axios.get(`http://eventcountdownapi.mralansmith.com/api/countries/${self.selectedCountry.id}/cities`, {
          cancelToken: currentCancelToken.token,
          params,
        });
        self.cities = data.cities;
        // loading(false);
      } catch (error) {
        if (!axios.isCancel(error)) {
          // loading(false);
          console.error(error);
        }
      }
    }, 200, { leading: false, trailing: true }),

    loadCities(search) {
      if (!this.selectedCountry) return;

      this.throttledLoadCities(search, this);
    },
  },

  mounted() {
    this.loadCountries();
    this.$store.subscribeAction((action) => {
      const { payload, type } = action;
      if (type === 'openAddEventModal') {
        if (payload) {
          this.eventId = payload.eventId;
          this.eventName = payload.eventName;
          this.eventDate = payload.eventDate;
          this.selectedCountry = payload.eventCountry;
          this.selectedCity = payload.eventCity;
          this.eventBackgroundImage = payload.eventBackgroundImage;
        }

        this.open();
      }
    });
  },
};
