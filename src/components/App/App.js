import EventList from '@sections/EventList/EventList.vue';
import ModifyEvent from '@modals/ModifyEvent/ModifyEvent.vue';
import { get } from '@/utils/storage';
import PlusIcon from '@/assets/icons/plus.svg';

export default {
  name: 'App',

  components: {
    EventList,
    ModifyEvent,
    PlusIcon,
  },

  methods: {
    openAddEvent() {
      this.$store.dispatch('openAddEventModal');
    },
  },

  async created() {
    try {
      const events = await get('events');

      events.forEach((event) => {
        event.eventDate = new Date(event.eventDate);
      });

      await this.$store.dispatch('setEvents', events);
    } catch (e) {
      console.log(e);
    }

    this.$store.subscribe((mutation) => {
      if (['SET_EVENTS', 'ADD_EVENT', 'REMOVE_EVENT', 'UPDATE_EVENT'].includes(mutation.type)) {
        this.$store.dispatch('syncEvents');
      }
    });
  },

  destroyed() {

  },
};
