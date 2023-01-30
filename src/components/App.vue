<template>
  <div class="flex flex-col h-screen p-0 m-0 overflow-hidden">
    <event-list v-if="hasEvents" />
    <blank-slate v-else />
    <StickyNotes />
    <AddPopover />
    <modify-event />
    <add-sticky-note />
  </div>
</template>
<script>
import EventList from './sections/EventList.vue';
import ModifyEvent from './modals/ModifyEvent.vue';
import BlankSlate from './sections/EventListBlankSlate.vue';
import { get } from '../utils/storage';
import AddPopover from './widgets/AddPopover.vue';
import AddStickyNote from './modals/AddStickyNote.vue';
import { STORE_EVENTS_TO_SYNC } from '../constants';
import StickyNotes from './sections/StickyNotes.vue';

// @vue/component
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

  methods: {
    openAddEvent() {
      this.$store.dispatch('openAddEventModal');
    },
  },
};
</script>
