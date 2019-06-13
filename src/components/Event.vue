<template>
  <div class="c-event">
    <div
      class="c-event__background"
      :style="{ 'background-image': 'url(' + background + ')' }"/>
    <div class="c-event__info">
      <span class="c-event__title">{{ eventName }}</span>
      <countdown
        :time="countdownDate"
        :emit-events="true"
        @progress="calculateCountdownProgress">
        <div class="c-event__countdown">
          <div class="c-event__countdown-weeks">{{ weekString }}</div>
          <div class="c-event__countdown-other">
            <div class="c-event__countdown-other-row">
              <span class="c-event__countdown-time" v-if="dayString">{{ dayString }}</span>
              <span class="c-event__countdown-time">{{ hourString }}</span>
            </div>
            <div class="c-event__countdown-other-row">
              <span class="c-event__countdown-time">{{ minuteString }}</span>
              <span class="c-event__countdown-time">{{ secondString }}</span>
            </div>
          </div>
        </div>
      </countdown>
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

  data() {
    return {
      weekString: '',
      dayString: '',
      hourString: '',
      minuteString: '',
      secondString: '',
    };
  },

  computed: {
    countdownDate() {
     return this.eventDate.getTime() - Date.now();
    },
  },

  methods: {
    calculateCountdownProgress({ weeks, days, hours, minutes, seconds }) {
        const weekCount = Math.round(days / 7);
        const dayCount = days % 7;

        this.weekString = this.getTimeString(weekCount, 'week');

        this.dayString = this.getTimeString(dayCount, 'day');

        this.hourString = this.getTimeString(hours, 'hour');

        this.minuteString = this.getTimeString(minutes, 'minute');

        this.secondString = this.getTimeString(seconds, 'second');
    },

    getTimeString(value, type) {
      if (value === 0 && type !== 'second' ) return '';
      return `${value} ${type}${value !== 1 ? 's' : ''}`;
    }
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
    height: 188px;
  }

  .c-event__title {
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .c-event__countdown {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .c-event__countdown-weeks {
    font-size: 24px;
    margin-right: 5px;
    text-align: center
  }

  .c-event__countdown-other {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    text-align: center
  }

  .c-event__countdown-other-row {
    display: flex;
    justify-content: center;
    padding: 2px;
  }

  .c-event__countdown-time {
    margin-right: 5px;
    width: 82px;
  }
</style>
