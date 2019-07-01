import Event from '@sections/Event/Event.vue';

export default {
  name: 'EventList',

  props: {
    events: {
      type: Array,
      required: true,
    },
  },

  components: {
    Event,
  },

  methods: {
    onRemoveEvent(id) {
      this.$emit('remove-event', id);
    },
  },
};
