import EventList from '@sections/EventList/EventList.vue';
import ModifyEvent from '@modals/ModifyEvent/ModifyEvent.vue';
import BlankSlate from '@sections/EventListBlankSlate/EventListBlankSlate.vue';
import { get } from '@/utils/storage';
import AddPopover from '@/components/widgets/AddPopover/AddPopover.vue';
import AddStickyNote from '@modals/AddStickyNote/AddStickyNote.vue';
import { STORE_EVENTS_TO_SYNC } from '@/constants';
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
      const data = await get('data');

      if (data) {
        if (data.events) {
          data.events.forEach((event) => {
            event.eventDate = new Date(event.eventDate);
          });
        }
        await this.$store.dispatch('restoreState', data);
      }
    } catch (e) {
      console.log(e);
    }

    this.$store.subscribe((mutation) => {
      if (STORE_EVENTS_TO_SYNC.includes(mutation.type)) {
        this.$store.dispatch('syncState');
      }
    });
  },
};
