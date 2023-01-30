<template>
  <div class="flex flex-1">
    <dragable v-model="events" item-key="id" group="events" class="flex flex-1" @start="drag = true" @end="drag = false">
      <template #item="{ element }">
        <event
          :event-id="element.eventId"
          :event-name="element.eventName"
          :event-date="element.eventDate"
          :event-country="element.eventCountry"
          :event-city="element.eventCity"
          :background="element.background" />
      </template>
    </dragable>
  </div>
</template>
<script>
import Event from './Event.vue';
import Dragable from 'vuedraggable';

export default {
  name: 'EventList',
  components: {
    Event,
    Dragable,
  },
  emits: ['remove-event'],
  computed: {
    events: {
      get() {
        return this.$store.state.events;
      },
      set(value) {
        this.$store.dispatch('setEvents', value);
      },
    },
  },

  methods: {
    onRemoveEvent(id) {
      this.$emit('remove-event', id);
    },
  },
};
</script>
