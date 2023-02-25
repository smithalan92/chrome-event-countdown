<template>
  <div class="flex flex-col h-screen p-0 m-0 overflow-hidden">
    <EventList v-if="hasEvents" />
    <BlankSlate v-else />
    <StickyNotes />
    <AddPopover />
    <ModifyEvent v-if="eventStore.isEventModalOpen" />
    <AddStickyNote v-if="noteStore.isNoteModalOpen" />
    <AccountModal v-if="appStore.isAccountModalOpen" />
    <button class="absolute top-[10px] right-[10px] hover:opacity-70 cursor-pointer" @click="onClickSettings">
      <div class="w-12 h-12 rounded-full border-4 border-sold border-white flex justify-center items-center">
        <UserIcon class="w-6 h-6 fill-white" />
      </div>
    </button>
  </div>
</template>
<script setup lang="ts">
import EventList from './sections/EventList.vue';
import ModifyEvent from './modals/ModifyEvent.vue';
import BlankSlate from './sections/EventListBlankSlate.vue';
import AddPopover from './widgets/AddPopover.vue';
import AddStickyNote from './modals/AddStickyNote.vue';
import StickyNotes from './sections/StickyNotes.vue';
import UserIcon from '../assets/icons/user.svg?component';
import AccountModal from './modals/Account.vue';
import { computed } from 'vue';
import { useAppStore } from '../store/app';
import { useEventStore } from '@/store/events';
import { useNoteStore } from '@/store/notes';

const appStore = useAppStore();
const eventStore = useEventStore();
const noteStore = useNoteStore();

appStore.startApp();

const hasEvents = computed(() => {
  return eventStore.events.length > 0;
});

const onClickSettings = () => {
  appStore.openAccountModal();
};
</script>
