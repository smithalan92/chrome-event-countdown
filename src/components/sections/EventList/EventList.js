import Event from "../../sections/Event/Event.vue";
import Dragable from "vuedraggable";

// @vue/component
export default {
  name: "EventList",
  components: {
    Event,
    Dragable,
  },
  emits: ["remove-event"],
  computed: {
    events: {
      get() {
        return this.$store.state.events;
      },
      set(value) {
        this.$store.dispatch("setEvents", value);
      },
    },
  },

  methods: {
    onRemoveEvent(id) {
      this.$emit("remove-event", id);
    },
  },
};
