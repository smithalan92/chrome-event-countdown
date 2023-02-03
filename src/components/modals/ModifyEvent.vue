<template>
  <ModalBase ref="modal" :title="modalTitle" @open="onModalOpen" @close="onModalClose">
    <template #body>
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
          ref="nameRef"
          v-model="eventName"
          placeholder="Your event name"
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
        <div class="flex flex-1 justify-center items-center p-5">
          <div
            v-if="!eventBackgroundImage"
            class="flex items-center justify-center h-[120px] w-[212px] border border-dashed border-grey-300">
            <span class="text-sm text-gray-400 select-none">Your image here</span>
          </div>
          <img class="h-[120px]" :src="eventBackgroundImage" />
        </div>
      </transition>
    </template>
    <template #footer>
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
    </template>
  </ModalBase>
</template>
<script setup>
/* eslint-disable func-names */
import vSelect from 'vue-select';
import throttle from 'lodash/throttle';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import 'vue-select/dist/vue-select.css';
import ModalBase from './ModalBase.vue';
import { ref, onMounted, watch, computed } from 'vue';
import { useStore } from 'vuex';
import { getCountries, getCitiesForCountry } from '../../api';

let abortController = null;
const store = useStore();
const modal = ref(null);
const nameRef = ref(null);

const eventId = ref(null);
const eventName = ref('');
const eventDate = ref(new Date().toISOString());
const eventBackgroundImage = ref('');
const countries = ref([]);
const cities = ref([]);
const selectedCountry = ref(null);
const selectedCity = ref(null);

const mode = computed(() => {
  if (eventId.value) return 'edit';
  return 'add';
});

const modalTitle = computed(() => {
  if (mode.value === 'edit') return 'Edit Event';
  return 'Add Event';
});

const isSaveButtonDisabled = computed(() => {
  return eventName.value.trim() === '' || eventDate.value === '' || !selectedCountry.value || !selectedCity.value;
});

watch(
  () => selectedCountry.value?.id,
  (newId, oldId) => {
    if (oldId === null && selectedCity.value) return;
    if (newId !== oldId && oldId !== undefined) selectedCity.value = null;
    cities.value = [];
  },
);

onMounted(() => {
  loadCountries();
  store.subscribeAction((action) => {
    const { payload, type } = action;
    if (type === 'openAddEventModal') {
      if (payload) {
        eventId.value = payload.eventId;
        eventName.value = payload.eventName;
        eventDate.value = payload.eventDate;
        selectedCountry.value = payload.eventCountry;
        selectedCity.value = payload.eventCity;
        eventBackgroundImage.value = payload.eventBackgroundImage;
      }

      modal.value.open();
    }
  });
});

const onModalOpen = () => {
  if (nameRef.value) nameRef.value.focus();
};

const onModalClose = () => {
  eventId.value = null;
  eventName.value = '';
  eventDate.value = '';
  eventBackgroundImage.value = '';
  selectedCountry.value = null;
  selectedCity.value = null;
};

const onClickConfirm = () => {
  if (mode.value === 'add') {
    onClickAdd();
  } else {
    onClickEdit();
  }
};

const validateInput = () => {
  if (eventName.value === '') return false;
  if (eventDate.value === '') return false;
  if (selectedCountry.value && !selectedCity.value) return false;

  if (
    eventBackgroundImage.value.endsWith('.png') ||
    eventBackgroundImage.value.endsWith('.jpg') ||
    eventBackgroundImage.value.endsWith('.jpeg') ||
    eventBackgroundImage.value.endsWith('.gif')
  )
    return true;

  if (eventBackgroundImage.value === '') {
    eventBackgroundImage.value = 'https://picsum.photos/1200/800';
  }

  return true;
};

const onClickAdd = async () => {
  if (!validateInput()) {
    console.log('invalid input');
    return;
  }

  await store.dispatch('addEvent', {
    name: eventName.value,
    date: eventDate.value,
    background: eventBackgroundImage.value,
    cityId: selectedCity.value.id,
  });

  modal.value.close();
};

const onClickEdit = async () => {
  if (!validateInput()) {
    console.log('invalid input');
    return;
  }

  await store.dispatch('updateEvent', {
    eventId: eventId.value,
    name: eventName.value,
    date: eventDate.value,
    background: eventBackgroundImage.value,
    cityId: selectedCity.value.id,
  });

  modal.value.close();
};

const onClickCancel = () => {
  modal.value.close();
};

const loadCountries = async () => {
  const data = await getCountries();
  countries.value = data.countries;
};

const throttledLoadCities = throttle(
  async (loading, search) => {
    try {
      abortController?.abort();
      abortController = new AbortController();
      if (!search) {
        cities.value = [];
        return;
      }
      loading(true);

      const data = await getCitiesForCountry({
        countryId: selectedCountry.value.id,
        searchTerm: search,
        signal: abortController.signal,
      });

      cities.value = data.cities;
      loading(false);
    } catch (error) {
      if (error?.name === 'CanceledError') return;
      loading(false);
      console.error(error);
    }
  },
  200,
  { leading: false, trailing: true },
);

const loadCities = (search, loading) => {
  if (!selectedCountry.value) return;

  throttledLoadCities(loading, search);
};
</script>
