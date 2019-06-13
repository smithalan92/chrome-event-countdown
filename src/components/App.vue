<template>
  <div class="c-app">
    <event
      event-name="Ukraine"
      :event-date="ukraineDate"
      background="https://www.nationalgeographic.com/content/dam/travel/Guide-Pages/europe/cityscape-kiev-ukraine.adapt.1900.1.jpg"></event>
    <event
      event-name="Thailand"
      :event-date="thailandDate"
      background="https://dak95nwic4sny.cloudfront.net/73/thailand-40155070-1508147260-ImageGalleryLightboxLarge.jpg"/>
  </div>
</template>
<script>
import Event from './Event.vue';

export default {
  name: 'App',

  components: {
    Event,
  },

  data() {
    return {
      ukraineDate: new Date('2019-08-02'),
      thailandDate: new Date('2019-10-25'),
    };
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
  }
</style>
