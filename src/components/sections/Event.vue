<template>
  <div class="flex items-center justify-center text-white h-full flex-1 cursor-move relative overflow-hidden min-w-[180px]">
    <div
      class="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed z-[-1] opacity-70"
      :style="{ 'background-image': 'url(' + background + ')' }" />
    <div class="bg-black/40 flex-1 h-[240px] w-[190px]">
      <div v-show="isReady" class="relative flex flex-col items-center justify-center p-4 flex-1">
        <div class="flex items-center absolute top-[10px] right-[10px]">
          <div class="py-1 px-2 cursor-pointer hover:opacity-70" @click="onClickEdit">
            <edit-icon class="fill-white w-4 h-4" />
          </div>
          <div class="py-1 px-2 cursor-pointer hover:opacity-70" @click="onClickRemove">
            <trash-icon class="fill-white w-4 h-4" />
          </div>
        </div>
        <div class="text-[40px] font-bold mb-1 overflow-hidden">{{ eventName }}</div>
        <countdown v-if="!hasEventPassed" :time="countdownDate" :emit-events="true" @progress="calculateCountdownProgress">
          <div class="flex flex-col items-center justify-center">
            <div class="text-2xl mr-1 text-center">{{ weekString }}</div>
            <div class="flex flex-col">
              <span class="mt-1 text-base text-center">{{ dayString }}</span>
              <span class="mt-1 text-base text-center">{{ hourString }}</span>
              <span class="mt-1 text-base text-center">{{ minuteString }}</span>
              <span class="mt-1 text-base text-center">{{ secondString }}</span>
            </div>
          </div>
        </countdown>
        <city-data :event-city="eventCity" :event-country="eventCountry" />
        <div v-if="hasEventPassed" class="flex flex-col items-center justify-center">
          {{ formatedEventDate }}
          <check-icon class="mt-5 w-8 h-8 fill-green-600" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Countdown from '@chenfengyuan/vue-countdown';
import format from 'date-fns/format';
import CityData from './CityData.vue';
import TrashIcon from '../../assets/icons/trash.svg';
import EditIcon from '../../assets/icons/edit.svg';
import CheckIcon from '../../assets/icons/check.svg';
import { useAppStore } from '../../store';
import { computed, ref, onMounted, watch } from 'vue';

const store = useAppStore();

const props = defineProps({
  eventId: {
    type: Number,
    required: true,
  },

  eventName: {
    type: String,
    required: true,
  },

  eventDate: {
    type: Date,
    required: true,
  },

  background: {
    type: String,
    required: false,
    default: '',
  },

  eventCountry: {
    type: [Object, null],
    required: false,
    default: null,
  },

  eventCity: {
    type: [Object, null],
    required: false,
    default: null,
  },
});

const weekString = ref('');
const dayString = ref('');
const hourString = ref('');
const minuteString = ref('');
const secondString = ref('');
const isReady = ref(false);

const formatedEventDate = computed(() => {
  return format(props.eventDate, 'dd MMMM yyyy, h:mma');
});

const countdownDate = computed(() => {
  return props.eventDate.getTime() - Date.now();
});

const hasEventPassed = computed(() => {
  return countdownDate.value < 0;
});

const getTimeString = (value, type) => {
  return `${value} ${type}${value !== 1 ? 's' : ''}`;
};

const calculateCountdownProgress = ({ days, hours, minutes, seconds }) => {
  const weekCount = Math.floor(days / 7);
  const dayCount = days % 7;

  weekString.value = getTimeString(weekCount, 'week');

  dayString.value = getTimeString(dayCount, 'day');

  hourString.value = getTimeString(hours, 'hour');

  minuteString.value = getTimeString(minutes, 'minute');

  secondString.value = getTimeString(seconds, 'second');

  if (!isReady.value) isReady.value = true;
};

const onClickRemove = () => {
  store.removeEvent(props.eventId);
};

const onClickEdit = () => {
  store.openAddEventModal({
    eventId: props.eventId,
    eventName: props.eventName,
    eventDate: props.eventDate.toISOString(),
    eventBackgroundImage: props.background,
    eventCountry: props.eventCountry,
    eventCity: props.eventCity,
  });
};

watch(hasEventPassed, () => {
  isReady.value = true;
});

onMounted(() => {
  if (hasEventPassed.value) {
    isReady.value = true;
  }
});
</script>
