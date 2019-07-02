import EventList from '@sections/EventList/EventList.vue';
import AddEvent from '@modals/AddEvent/AddEvent.vue';
import { get } from '@/utils/storage';

export default {
  name: 'App',

  components: {
    EventList,
    AddEvent,
  },

  methods: {
    openAddEvent() {
      this.$refs.addEvent.open();
    },
  },

  created() {
    const events = get('events') || [];

    events.forEach((event) => {
      event.eventDate = new Date(event.eventDate);
    });

    this.$store.dispatch('setEvents', events);

    this.$store.subscribe((mutation) => {
      if (['ADD_EVENT', 'REMOVE_EVENT'].includes(mutation.type)) {
        this.$store.dispatch('syncEvents');
      }
    });
  },

  destroyed() {

  },
};
