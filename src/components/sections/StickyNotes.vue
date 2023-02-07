<template>
  <div class="absolute top-0 left-0 w-screen flex p-6 overflow-x-scroll">
    <StickyNote v-for="note in notes" :key="note.id" :note="note" @delete="deleteNote" @update="updateNote" />
  </div>
</template>
<script setup lang="ts">
import StickyNote from './StickyNote.vue';
import { debounce } from 'lodash';
import { computed } from 'vue';
import { useNoteStore } from '../../store/notes';

const store = useNoteStore();

const notes = computed(() => store.notes);

const deleteNote = (noteId: number) => {
  store.removeNote(noteId);
};

const debounceUpdateNote = debounce((id: number, text: string) => {
  store.updateNote({ id, text });
}, 1000);

const updateNote = ({ id, text }: { id: number; text: string }) => {
  debounceUpdateNote(id, text);
};
</script>
