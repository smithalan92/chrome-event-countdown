<template>
  <div class="c-app">
    <events :events="events"/>
    <add-event/>
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

  created() {
    const events = get('events') || [];

    events.forEach((event) => {
      event.date = new Date(event.date);
      this.events.push(event);
    });
  },
};
</script>
<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Muli:400,700&display=swap');

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
  }

  .c-app {
    display: flex;
    flex-direction: column;
  }
</style>
