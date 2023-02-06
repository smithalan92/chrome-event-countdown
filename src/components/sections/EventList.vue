<template>
  <div class="flex flex-1 relative">
    <div v-if="isReorderingEvents" class="absolute top-0 left-0 z-10 flex justify-center items-center w-screen h-screen bg-black/40">
      <Spinner class="w-24 h-24 fill-white animate-spin" />
    </div>
    <dragable v-model="events" item-key="id" group="events" class="flex flex-1" @start="drag = true" @end="drag = false">
      <template #item="{ element }">
        <event
          :event-id="element.id"
          :event-name="element.name"
          :event-date="element.eventDate"
          :event-country="element.country"
          :event-city="element.city"
          :background="element.background" />
      </template>
    </dragable>
  </div>
</template>
<script setup>
import Event from './Event.vue';
import Dragable from 'vuedraggable';
import { computed } from 'vue';
import { useAppStore } from '../../store';
import Spinner from '../../assets/icons/spinner.svg';

const store = useAppStore();

const isReorderingEvents = computed(() => store.isReorderingEvents);

const events = computed({
  get() {
    return store.sortedEvents;
  },
  set(events) {
    store.reorderEvents(events);
  },
});
</script>
