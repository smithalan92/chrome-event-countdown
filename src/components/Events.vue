<template>
  <div class="c-events">
    <event
      v-for="event in events"
      :key="event.name"
      :event-name="event.name"
      :event-date="event.date"
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
  }
</style>

