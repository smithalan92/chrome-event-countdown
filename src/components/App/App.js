import EventList from '@sections/EventList/EventList.vue';
import ModifyEvent from '@modals/ModifyEvent/ModifyEvent.vue';
import BlankSlate from '@sections/EventListBlankSlate/EventListBlankSlate.vue';
import { get } from '@/utils/storage';
import AddPopover from '@/components/widgets/AddPopover/AddPopover.vue';
import AddStickyNote from '@modals/AddStickyNote/AddStickyNote.vue';
import StickyNotes from '../sections/StickyNotes/StickyNotes.vue';

export default {
  name: 'App',

  components: {
    EventList,
    ModifyEvent,
    BlankSlate,
    AddPopover,
    StickyNotes,
    AddStickyNote,
  },

  computed: {
    hasEvents() {
      return !!this.$store.state.events.length;
    },
  },

  methods: {
    openAddEvent() {
      this.$store.dispatch('openAddEventModal');
    },
  },

  async created() {
    try {
      const events = await get('events');
      const notes = await get('notes');

      if (events) {
        events.forEach((event) => {
          event.eventDate = new Date(event.eventDate);
        });

        await this.$store.dispatch('setEvents', events);
      }

      if (notes) {
        await this.$store.dispatch('setNotes', notes);
      }
    } catch (e) {
      console.log(e);
    }

    this.$store.subscribe((mutation) => {
      if (['SET_EVENTS', 'ADD_EVENT', 'REMOVE_EVENT', 'UPDATE_EVENT'].includes(mutation.type)) {
        this.$store.dispatch('syncEvents');
      } else if (['SET_NOTES', 'ADD_NOTE', 'REMOVE_NOTE'].includes(mutation.type)) {
        this.$store.dispatch('syncNotes');
      }
    });
  },
};
