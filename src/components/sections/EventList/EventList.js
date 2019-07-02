import Event from '@sections/Event/Event.vue';

export default {
  name: 'EventList',

  components: {
    Event,
  },

  computed: {
    events() {
      return this.$store.state.events;
    },
  },

  methods: {
    onRemoveEvent(id) {
      this.$emit('remove-event', id);
    },
  },
};
