<template>
  <div class="flex flex-col h-screen p-0 m-0 overflow-hidden">
    <event-list v-if="hasEvents" />
    <blank-slate v-else />
    <StickyNotes />
    <AddPopover />
    <modify-event />
    <add-sticky-note />
    <settings-modal />
    <button class="absolute top-[10px] right-[10px] hover:opacity-70 cursor-pointer" @click="onClickSettings">
      <SettingsIcon class="w-8 h-8 fill-white" />
    </button>
  </div>
</template>
<script setup>
import EventList from './sections/EventList.vue';
import ModifyEvent from './modals/ModifyEvent.vue';
import BlankSlate from './sections/EventListBlankSlate.vue';
import AddPopover from './widgets/AddPopover.vue';
import AddStickyNote from './modals/AddStickyNote.vue';
import StickyNotes from './sections/StickyNotes.vue';
import SettingsIcon from '../assets/icons/settings.svg';
import SettingsModal from './modals/Settings.vue';
import { computed } from 'vue';
import { useAppStore } from '../store';

const store = useAppStore();

store.startApp();

const hasEvents = computed(() => {
  return store.events.length > 0;
});

const onClickSettings = () => {
  store.openSettingsModal();
};
</script>
