import EventList from '@sections/EventList/EventList.vue';
import AddEvent from '@modals/AddEvent/AddEvent.vue';
import { get, set } from '@/utils/storage';

export default {
  name: 'App',

  components: {
    EventList,
    AddEvent,
  },

  data() {
    return {
      events: [],
    };
  },

  methods: {
    onAddEvent(event) {
      this.events.push(event);
      set('events', this.events);
    },

    openAddEvent() {
      this.$refs.addEvent.open();
    },

    onRemoveEvent(eventId) {
      const index = this.events.findIndex(event => event.eventId === eventId);
      this.events.splice(index, 1);
      set('events', this.events);
    },
  },

  created() {
    const events = get('events') || [];

    events.forEach((event) => {
      event.eventDate = new Date(event.eventDate);
      this.events.push(event);
    });
  },
};
