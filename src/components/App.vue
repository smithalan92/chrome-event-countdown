<template>
  <div class="c-app">
    <events
      :events="events"
      @remove-event="onRemoveEvent"/>
    <div
      class="c-app__add-event-button"
      @click="openAddEvent">Add Event</div>
    <add-event
      ref="addEvent"
      @add="onAddEvent"/>
  </div>
</template>
<script>
import Events from './Events.vue';
import AddEvent from './AddEvent.vue';
import { get, set } from '../utils/storage';

export default {
  name: 'App',

  components: {
    Events,
    AddEvent,
  },

  data() {
    return {
      events: [],
    };
  },

  methods: {
    onAddEvent(event) {
      this.events.push(event);
      set('events', this.events);
    },

    openAddEvent() {
      this.$refs.addEvent.open();
    },

    onRemoveEvent(eventId) {
      const index = this.events.findIndex((event) => event.eventId === eventId);
      this.events.splice(index, 1);
      set('events', this.events);
    },
  },

  created() {
    const events = get('events') || [];

    events.forEach((event) => {
      event.eventDate = new Date(event.eventDate);
      this.events.push(event);
    });
  },
};
</script>
<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Muli:400,700&display=swap');
  @import "../../node_modules/vue2-animate/src/sass/vue2-animate.scss";

  html,
  body,
  .c-app {
    height: 100%;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Muli', sans-serif;
    background-color: #000;
    color: #474747;
  }

  .c-app {
    display: flex;
    flex-direction: column;
  }

  .c-app__add-event-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 30px;
    background: #fff;
    border-radius: 2px;
    position: absolute;
    bottom: 30px;
    right: 30px;
    cursor: pointer;
  }
</style>
