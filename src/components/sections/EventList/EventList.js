import Event from '@sections/Event/Event.vue';
import Dragable from 'vuedraggable';

export default {
  name: 'EventList',

  components: {
    Event,
    Dragable,
  },

  computed: {
    events: {
      get() {
        return this.$store.state.events;
      },
      set(value) {
        this.$store.dispatch('setEvents', value);
      },
    },
  },

  methods: {
    onRemoveEvent(id) {
      this.$emit('remove-event', id);
    },
  },
};
