<template>
  <div class="c-events">
    <event
      v-for="event in events"
      :key="event.name"
      :event-name="event.eventName"
      :event-date="event.eventDate"
      :background="event.background"/>
  </div>
</template>
<script>
import Event from './Event';

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
};
</script>
<style lang="scss">
  .c-events {
    display: flex;
    flex: 1;
  }
</style>

