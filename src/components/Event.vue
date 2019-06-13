<template>
  <div class="c-event">
    <div
      class="c-event__background"
      :style="{ 'background-image': 'url(' + background + ')' }"/>
    <div class="c-event__info">
      <span class="c-event__title">{{ eventName }}</span>
      <div class="c-event__countdown">
        <countdown :time="countdownDate">
          <template slot-scope="props">
            <div v-html="getTimeHtml(props)"></div>
          </template>
        </countdown>
      </div>
    </div>
  </div>
</template>
<script>
import Countdown from '@chenfengyuan/vue-countdown';

export default {
  name: 'Event',

  props: {
    eventName: {
      type: String,
      required: true
    },

    eventDate: {
      type: Date,
      required: true,
    },

    background: {
      type: String,
      required: false,
      default: ''
    },
  },

  components: {
    Countdown,
  },

  computed: {
    countdownDate() {
     return this.eventDate.getTime() - Date.now();
    },
  },

  methods: {
    getTimeHtml(props) {
      if (props.days > 7) {
        const weeks = Math.round(props.days / 7);
        const days = props.days % 7;
        let html = ''
        html += `</br>${weeks} week${weeks !== 1 ? 's' : ''}`;

        html += `</br>${days} day${days !== 1 ? 's' : ''}`

        html += `</br>${props.hours} hour${props.hours !== 1 ? 's' : ''}`

        html += `</br>${props.minutes} minute${props.minutes !== 1 ? 's' : ''}`

        html += `</br>${props.seconds} second${props.seconds !== 1 ? 's' : ''}`

        return html;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
  .c-event {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #fff;
    position: relative;
    flex: 1;
  }

  .c-event__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    z-index: -1;
    opacity: 0.7;
  }

  .c-event__info {
    display: flex;
    flex-direction: column;
    background: rgba(#000, 0.4);
    align-items: center;
    justify-content: center;
    padding: 30px;
    flex: 1;
  }

  .c-event__title {
    font-size: 40px;
  }

  .c-event__countdown {
    font-size: 18px;
    text-align: center;
  }
</style>
