import Countdown from "@chenfengyuan/vue-countdown";
import format from "date-fns/format";
import CityData from "../../sections/CityData/CityData.vue";
import TrashIcon from "../../../assets/icons/trash.svg";
import EditIcon from "../../../assets/icons/edit.svg";
import CheckIcon from "../../../assets/icons/check.svg";

// @vue/component
export default {
  name: "Event",

  components: {
    Countdown,
    CityData,
    TrashIcon,
    EditIcon,
    CheckIcon,
  },

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
      default: "",
    },

    eventCountry: {
      type: [Object, null],
      required: false,
      default: null,
    },

    eventCity: {
      type: [Object, null],
      required: false,
      default: null,
    },
  },

  data() {
    return {
      weekString: "",
      dayString: "",
      hourString: "",
      minuteString: "",
      secondString: "",
      isReady: false,
      formatedEventDate: format(this.eventDate, "dd MMMM yyyy, h:mma"),
    };
  },

  computed: {
    countdownDate() {
      return this.eventDate.getTime() - Date.now();
    },

    hasEventPassed() {
      return this.countdownDate < 0;
    },
  },

  watch: {
    hasEventPassed() {
      this.isReady = true;
    },
  },

  mounted() {
    if (this.hasEventPassed) this.isReady = true;
  },

  methods: {
    calculateCountdownProgress({ days, hours, minutes, seconds }) {
      const weekCount = Math.floor(days / 7);
      const dayCount = days % 7;

      this.weekString = this.getTimeString(weekCount, "week");

      this.dayString = this.getTimeString(dayCount, "day");

      this.hourString = this.getTimeString(hours, "hour");

      this.minuteString = this.getTimeString(minutes, "minute");

      this.secondString = this.getTimeString(seconds, "second");

      if (!this.isReady) this.isReady = true;
    },

    getTimeString(value, type) {
      return `${value} ${type}${value !== 1 ? "s" : ""}`;
    },

    onClickRemove() {
      this.$store.dispatch("removeEvent", this.eventId);
    },

    onClickEdit() {
      this.$store.dispatch("openAddEventModal", {
        eventId: this.eventId,
        eventName: this.eventName,
        eventDate: this.eventDate.toISOString(),
        eventBackgroundImage: this.background,
        eventCountry: this.eventCountry,
        eventCity: this.eventCity,
      });
    },
  },
};
