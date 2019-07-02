import Countdown from '@chenfengyuan/vue-countdown';
import TrashIcon from '@/assets/icons/trash.svg';

export default {
  name: 'Event',

  props: {
    eventId: {
      type: Number,
      required: true,
    },

    eventName: {
      type: String,
      required: true,
    },

    eventDate: {
      type: Date,
      required: true,
    },

    background: {
      type: String,
      required: false,
      default: '',
    },
  },

  components: {
    Countdown,
    TrashIcon,
  },

  data() {
    return {
      weekString: '',
      dayString: '',
      hourString: '',
      minuteString: '',
      secondString: '',
      isReady: false,
    };
  },

  computed: {
    countdownDate() {
      return this.eventDate.getTime() - Date.now();
    },
  },

  methods: {
    calculateCountdownProgress({ days, hours, minutes, seconds }) {
      const weekCount = Math.floor(days / 7);
      const dayCount = days % 7;

      this.weekString = this.getTimeString(weekCount, 'week');

      this.dayString = this.getTimeString(dayCount, 'day');

      this.hourString = this.getTimeString(hours, 'hour');

      this.minuteString = this.getTimeString(minutes, 'minute');

      this.secondString = this.getTimeString(seconds, 'second');

      if (!this.isReady) this.isReady = true;
    },

    getTimeString(value, type) {
      return `${value} ${type}${value !== 1 ? 's' : ''}`;
    },

    onClickRemove() {
      this.$store.dispatch('removeEvent', this.eventId);
    },
  },
};
