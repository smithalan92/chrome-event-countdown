<template>
  <div class="flex items-center justify-center text-white h-full flex-1 cursor-move relative overflow-hidden min-w-[180px]">
    <div
      class="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed z-[-1] opacity-70"
      :style="{ 'background-image': 'url(' + event.background + ')' }" />
    <div class="bg-black/40 flex-1 h-[240px] w-[190px]">
      <div class="relative flex flex-col items-center justify-center p-4 flex-1">
        <div class="flex items-center absolute top-[10px] right-[10px]">
          <div class="py-1 px-2 cursor-pointer hover:opacity-70" @click="onClickEdit">
            <edit-icon class="fill-white w-4 h-4" />
          </div>
          <div class="py-1 px-2 cursor-pointer hover:opacity-70" @click="onClickRemove">
            <trash-icon class="fill-white w-4 h-4" />
          </div>
        </div>
        <div class="text-center text-[40px] font-bold mb-1 overflow-hidden whitespace-nowrap text-ellipsis w-full">
          {{ event.name }}
        </div>
        <div class="flex flex-col items-center justify-center" v-if="!hasEventPassed && !isTimerLoading">
          <span class="text-2xl mr-1 text-center">{{ weekCount }} week{{ maybePluralize(weekCount) }}</span>
          <span class="mt-1 text-base text-center">{{ dayCount }} day{{ maybePluralize(dayCount) }}</span>
          <span class="mt-1 text-base text-center">{{ timer.hours }} hour{{ maybePluralize(timer.hours) }}</span>
          <span class="mt-1 text-base text-center">{{ timer.minutes }} minute{{ maybePluralize(timer.minutes) }}</span>
          <span class="mt-1 text-base text-center">{{ timer.seconds }} second{{ maybePluralize(timer.seconds) }}</span>
        </div>
        <div v-if="hasEventPassed" class="flex flex-col items-center justify-center">
          {{ formatedEventDate }}
          <check-icon class="mt-5 w-8 h-8 fill-green-600" />
        </div>
        <div class="absolute top-[240px] r-[calc(50%-100px)]">
          <city-data :event-city="event.city" :event-country="event.country" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import format from 'date-fns/format';
import CityData from './CityData.vue';
import TrashIcon from '../../assets/icons/trash.svg?component';
import EditIcon from '../../assets/icons/edit.svg?component';
import CheckIcon from '../../assets/icons/check.svg?component';
import { useEventStore } from '@/store/events';
import { computed, isRef, watch, type Ref } from 'vue';
import type { Event } from '../../api/api.types';
import { useTimer } from 'vue-timer-hook';

const eventStore = useEventStore();

const props = defineProps<{
  event: Event;
}>();

const timer = useTimer(props.event.eventDate.getTime(), true);

watch(
  () => props.event,
  (newValue, oldValue) => {
    if (newValue.eventDate.getTime() !== oldValue.eventDate.getTime()) {
      timer.restart(newValue.eventDate.getTime());
    }
  },
);

const formatedEventDate = computed(() => {
  return format(props.event.eventDate, 'dd MMMM yyyy, h:mma');
});

const weekCount = computed(() => {
  return Math.floor(timer.days.value / 7);
});

const dayCount = computed(() => {
  return timer.days.value % 7;
});

const maybePluralize = (count: number | Ref<number>) => {
  if (isRef(count)) return count.value === 1 ? '' : 's';
  return count === 1 ? '' : 's';
};

const hasEventPassed = computed(() => {
  return timer.isExpired.value;
});

const isTimerLoading = computed(() => {
  return timer.days.value === 0 && timer.hours.value === 0 && timer.seconds.value === 0 && !timer.isExpired.value;
});

const onClickRemove = () => {
  eventStore.removeEvent(props.event.id);
};

const onClickEdit = () => {
  eventStore.openAddEventModal(props.event);
};
</script>
