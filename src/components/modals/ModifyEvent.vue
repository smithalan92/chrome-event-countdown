<template>
  <ModalBase ref="modal" :title="modalTitle" @open="onModalOpen" @close="onModalClose">
    <template #body>
      <div class="flex flex-col mb-2">
        <span class="min-w-[120px] select-none mb-2 font-semibold">Event Country</span>
        <v-select v-model="selectedCountry" :options="countries" placeholder="Select a country" label="name" class="flex-1"></v-select>
      </div>
      <div class="flex flex-col mb-2">
        <span class="min-w-[120px] select-none mb-2 font-semibold">Event City</span>
        <v-select
          v-model="selectedCity"
          :disabled="!selectedCountry"
          :options="cities"
          placeholder="Select a city"
          label="name"
          class="flex-1"
          @search="searchCities"
          :loading="isLoadingCities">
          <template #no-options>
            <template v-if="isLoadingCities"> Loading... </template>
            <template v-else> No results found </template>
          </template>
        </v-select>
      </div>
      <div class="flex flex-col mb-2">
        <span class="min-w-[120px] select-none mb-2 font-semibold">Event Name</span>
        <input
          ref="nameRef"
          v-model="eventName"
          placeholder="Your event name"
          class="flex-1 p-2 rounded border border-solid border-gray-200 outline-none h-9"
          type="text" />
      </div>
      <div class="flex flex-col mb-2">
        <span class="min-w-[120px] select-none mb-2 font-semibold">Event Date</span>
        <DatePicker
          class="flex-1"
          v-model="eventDate"
          mode="dateTime"
          :is24hr="true"
          :is-required="true"
          :popover="{ visibility: 'focus' }">
          <template v-slot="{ inputValue, inputEvents }">
            <input
              class="w-full p-2 rounded border border-solid border-gray-200 outline-none h-9"
              :value="inputValue"
              readonly
              v-on="inputEvents" />
          </template>
        </DatePicker>
      </div>
      <div class="flex flex-col mb-2">
        <span class="min-w-[120px] select-none mb-2 font-semibold">Image</span>
        <div class="flex flex-col flex-1">
          <input v-model="eventBackgroundImage" class="p-1 rounded border border-solid border-gray-200 outline-none h-9" type="url" />
          <span class="mt-1 text-[12px]"> Paste a URL to an image here. If empty, a random image will be used. </span>
        </div>
      </div>
      <transition name="zoom">
        <div class="flex flex-1 justify-center items-center p-2">
          <div
            v-if="!eventBackgroundImage"
            class="flex items-center justify-center h-[120px] w-[212px] border border-dashed border-gray-300">
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
<script setup lang="ts">
// @ts-expect-error
import vSelect from 'vue-select';
import { debounce } from 'lodash';
import 'vue-select/dist/vue-select.css';
import ModalBase from './ModalBase.vue';
import { ref, onMounted, watch, computed } from 'vue';
import { useEventStore } from '@/store/events';
import { useGeoStore } from '@/store/geo';
import type { City, Country } from '@/api/api.types';
import type { AxiosError } from 'axios';
import { storeToRefs } from 'pinia';
import { DatePicker } from 'v-calendar';

import 'v-calendar/dist/style.css';

const eventStore = useEventStore();

const geoStore = useGeoStore();
const { countries, cities, isLoadingCities } = storeToRefs(geoStore);

const modal = ref<typeof ModalBase | null>(null);
const nameRef = ref<HTMLInputElement | null>(null);

const eventId = ref<number | null>(null);
const eventName = ref('');
const eventDate = ref(new Date());
const eventBackgroundImage = ref('');
const selectedCountry = ref<Country | null>(null);
const selectedCity = ref<City | null>(null);

const mode = computed(() => {
  if (eventId.value) return 'edit';
  return 'add';
});

const modalTitle = computed(() => {
  if (mode.value === 'edit') return 'Edit Event';
  return 'Add Event';
});

const isSaveButtonDisabled = computed(() => {
  return eventName.value.trim() === '' || !eventDate.value || !selectedCountry.value || !selectedCity.value;
});

watch(selectedCountry, (newVal, oldVal) => {
  if (oldVal === null && selectedCity.value) return;
  if (newVal?.id !== oldVal?.id && oldVal?.id !== undefined) selectedCity.value = null;
  if (newVal?.id) {
    geoStore.loadCitiesForCountry({ countryId: newVal!.id, searchTerm: '' });
  }
});

onMounted(() => {
  eventStore.$onAction(({ name, args }) => {
    if (name === 'openAddEventModal') {
      const event = args[0];
      if (event) {
        eventId.value = event.id;
        eventName.value = event.name;
        eventDate.value = event.eventDate.toISOString();
        selectedCountry.value = event.country;
        selectedCity.value = event.city;
        eventBackgroundImage.value = event.background;
      }

      modal.value!.open();
    }
  });
});

const onModalOpen = () => {
  if (nameRef.value) nameRef.value.focus();
};

const onModalClose = () => {
  eventId.value = null;
  eventName.value = '';
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
  if (!eventDate.value) return false;
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

  await eventStore.addEvent({
    name: eventName.value,
    date: eventDate.value.toISOString(),
    background: eventBackgroundImage.value,
    cityId: selectedCity.value!.id,
  });

  modal.value!.close();
};

const onClickEdit = async () => {
  if (!validateInput()) {
    console.log('invalid input');
    return;
  }

  await eventStore.updateEvent({
    eventId: eventId.value!,
    name: eventName.value,
    date: eventDate.value,
    background: eventBackgroundImage.value,
    cityId: selectedCity.value!.id,
  });

  modal.value!.close();
};

const onClickCancel = () => {
  modal.value!.close();
};

const throttledLoadCities = debounce(
  async (search) => {
    try {
      await geoStore.loadCitiesForCountry({
        countryId: selectedCountry.value!.id,
        searchTerm: search,
      });
    } catch (error) {
      if ((error as AxiosError)?.name === 'CanceledError') return;
      console.error(error);
    }
  },
  500,
  { trailing: true },
);

const searchCities = (search: string) => {
  if (!selectedCountry.value) return;
  throttledLoadCities(search);
};
</script>
