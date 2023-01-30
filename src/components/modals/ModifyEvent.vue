<template>
  <div v-if="isOverlayVisible" class="absolute top-0 left-0 w-screen h-screen bg-white/20 flex justify-center items-center">
    <transition name="slideDown">
      <div v-if="isVisible" v-click-outside="close" class="flex flex-col w-96 bg-white p-6 rounded" style="animation-duration: 0.5s">
        <div class="flex justify-between items-center pb-3">
          <div class="font-bold text-l">
            {{ mode === 'edit' ? `Edit ${eventName}` : 'Add New Event' }}
          </div>
          <div class="p-1 cursor-pointer hover:opacity-80" @click="close">
            <close-icon class="fill-gray-600 w-5 h-5" />
          </div>
        </div>
        <div class="flex flex-col py-2 flex-1">
          <div class="flex items-center mb-2">
            <span class="min-w-[120px] select-none">Event Country</span>
            <v-select
              v-model="selectedCountry"
              :options="countries"
              placeholder="Type to search countries"
              label="name"
              class="flex-1"></v-select>
          </div>
          <div v-if="selectedCountry" class="flex items-center mb-2">
            <span class="min-w-[120px] select-none">Event City</span>
            <v-select
              v-model="selectedCity"
              :options="cities"
              placeholder="Type to search cities"
              label="name"
              class="flex-1"
              @search="loadCities"></v-select>
          </div>
          <div class="flex items-center mb-2">
            <span class="min-w-[120px] select-none">Event Name</span>
            <input
              ref="name"
              v-model="eventName"
              class="flex-1 p-1 rounded border border-solid border-gray-200 outline-none h-9"
              type="text" />
          </div>
          <div class="flex items-center mb-2">
            <span class="min-w-[120px] select-none">Event Date</span>
            <Datepicker v-model="eventDate" />
          </div>
          <div class="flex items-center mb-2">
            <span class="min-w-[120px] select-none">Image</span>
            <div class="flex flex-col flex-1">
              <input v-model="eventBackgroundImage" class="p-1 rounded border border-solid border-gray-200 outline-none h-9" type="url" />
              <span class="mt-1 text-[8px]"> Paste a URL to an image here. If empty, a random image will be used. </span>
            </div>
          </div>
          <transition name="zoom">
            <div v-if="eventBackgroundImage" class="flex flex-1 justify-center items-center p-5">
              <img class="max-h-[120px]" :src="eventBackgroundImage" />
            </div>
          </transition>
        </div>
        <div class="flex justify-end pt-5">
          <button
            class="outline-none bg-white text-sm py-2 px-4 text-red-600 mr-3 hover:underline rounded cursor-pointer"
            @click="onClickCancel">
            Cancel
          </button>
          <button
            class="outline-none bg-green-600 text-sm py-2 px-4 text-white mr-3 hover:bg-green-700 rounded cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
            :disabled="isSaveButtonDisabled"
            @click="onClickConfirm">
            {{ mode === 'edit' ? `Update` : 'Add' }}
          </button>
        </div>
      </div>
    </transition>
    <global-events @keydown.esc="close" />
  </div>
</template>
<script>
/* eslint-disable func-names */

import axios, { CancelToken, isCancel } from 'axios';
import { GlobalEvents } from 'vue-global-events';
import vSelect from 'vue-select';
import throttle from 'lodash/throttle';
import CloseIcon from '../../assets/icons/close.svg';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import 'vue-select/dist/vue-select.css';

let currentCancelToken = null;

// @vue/component
export default {
  name: 'ModifyEvent',

  components: {
    GlobalEvents,
    Datepicker,
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
    };
  },

  computed: {
    mode() {
      if (this.eventId) return 'edit';
      return 'add';
    },

    isSaveButtonDisabled() {
      return this.eventName.trim() === '' || this.eventDate === '' || !this.selectedCountry || !this.selectedCity;
    },
  },

  watch: {
    'selectedCountry.id': function (newId, oldId) {
      if (oldId === null && this.selectedCity) return;
      if (newId !== oldId && oldId !== undefined) this.selectedCity = null;
      this.cities = [];
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

  methods: {
    async open() {
      this.isOverlayVisible = true;
      await this.$nextTick();
      this.isVisible = true;
      if (this.$refs.name) this.$refs.name.focus();
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

      if (
        this.eventBackgroundImage.endsWith('.png') ||
        this.eventBackgroundImage.endsWith('.jpg') ||
        this.eventBackgroundImage.endsWith('.jpeg') ||
        this.eventBackgroundImage.endsWith('.gif')
      )
        return true;

      if (this.eventBackgroundImage === '') {
        this.eventBackgroundImage = 'https://picsum.photos/1200/800';
      }

      return true;
    },

    onClickCancel() {
      this.close();
    },

    async loadCountries() {
      const { data } = await axios.get('https://eventcountdownapi.mralansmith.com/api/countries');
      this.countries = data.countries;
    },

    throttledLoadCities: throttle(
      async (loading, search, self) => {
        try {
          if (currentCancelToken) currentCancelToken.cancel('Cancelling old request');
          currentCancelToken = CancelToken.source();
          if (!search) return;
          loading(true);
          const params = { limit: 15 };
          if (search) params.searchTerm = search;

          const { data } = await axios.get(`https://eventcountdownapi.mralansmith.com/api/countries/${self.selectedCountry.id}/cities`, {
            cancelToken: currentCancelToken.token,
            params,
          });
          self.cities = data.cities;
          loading(false);
        } catch (error) {
          if (!isCancel(error)) {
            loading(false);
            console.error(error);
          }
        }
      },
      200,
      { leading: false, trailing: true },
    ),

    loadCities(search, loading) {
      if (!this.selectedCountry) return;

      this.throttledLoadCities(loading, search, this);
    },
  },
};
</script>
