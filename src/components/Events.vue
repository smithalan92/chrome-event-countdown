<template>
  <div class="c-events">
    <event
      v-for="event in events"
      :key="event.name"
      :event-id="event.eventId"
      :event-name="event.eventName"
      :event-date="event.eventDate"
      :background="event.background"
      @remove-event="onRemoveEvent"/>
  </div>
</template>
<script>
import Event from './Event.vue';

export default {
  name: 'Events',

  props: {
    events: {
      type: Array,
      required: true,
    },
  },

  components: {
    Event,
  },

  methods: {
    onRemoveEvent(id) {
      this.$emit('remove-event', id);
    },
  },
};
</script>
<style lang="scss">
  .c-events {
    display: flex;
    flex: 1;
  }
</style>
