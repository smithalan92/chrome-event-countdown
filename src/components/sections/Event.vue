<template>
  <div
    class="flex items-center justify-center text-white h-full flex-1 cursor-move relative"
  >
    <div
      class="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat bg-fixed z-[-1] opacity-70"
      :style="{ 'background-image': 'url(' + background + ')' }"
    />
    <div
      class="relative flex flex-col bg-black/40 items-center justify-center p-4 flex-1 min-h-[210px]"
    >
      <div
        v-if="isReady"
        class="flex items-center absolute top-[10px] right-[10px]"
      >
        <div
          class="py-1 px-2 cursor-pointer hover:opacity-70"
          @click="onClickEdit"
        >
          <edit-icon class="fill-white w-4 h-4" />
        </div>
        <div
          class="py-1 px-2 cursor-pointer hover:opacity-70"
          @click="onClickRemove"
        >
          <trash-icon class="fill-white w-4 h-4" />
        </div>
      </div>
      <span v-if="isReady" class="text-[40px] font-bold mb-1">{{
        eventName
      }}</span>
      <city-data :event-city="eventCity" :event-country="eventCountry" />
      <countdown
        v-if="!hasEventPassed"
        :time="countdownDate"
        :emit-events="true"
        @progress="calculateCountdownProgress"
      >
        <div class="flex flex-col items-center justify-center">
          <div class="text-2xl mr-1 text-center">{{ weekString }}</div>
          <div class="flex flex-col">
            <span class="mt-1 text-base text-center">{{ dayString }}</span>
            <span class="mt-1 text-base text-center">{{ hourString }}</span>
            <span class="mt-1 text-base text-center">{{ minuteString }}</span>
            <span class="mt-1 text-base text-center">{{ secondString }}</span>
          </div>
        </div>
      </countdown>
      <div v-else class="flex flex-col items-center justify-center">
        {{ formatedEventDate }}
        <check-icon class="mt-5 w-8 h-8 fill-green-600" />
      </div>
    </div>
  </div>
</template>
<script>
import Countdown from "@chenfengyuan/vue-countdown";
import format from "date-fns/format";
import CityData from "./CityData.vue";
import TrashIcon from "../../assets/icons/trash.svg";
import EditIcon from "../../assets/icons/edit.svg";
import CheckIcon from "../../assets/icons/check.svg";

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
</script>
