<template>
  <div class="absolute top-0 left-0 w-screen flex p-6 overflow-x-scroll">
    <StickyNote v-for="note in notes" :key="note.id" :note="note" @delete="deleteNote" @update="updateNote" />
  </div>
</template>
<script setup>
import StickyNote from './StickyNote.vue';
import { computed } from 'vue';
import { useAppStore } from '../../store';

const store = useAppStore();

const notes = computed(() => store.notes);

const deleteNote = (noteId) => {
  store.removeNote(noteId);
};

const updateNote = ({ noteId, text }) => {
  store.updateNote({ noteId, text });
};
</script>
