import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useAppStore } from './app';
import * as api from '../api/api';
import { get, set } from '../utils/storage';
import type { Note } from '../api/api.types';

export const useNoteStore = defineStore('notes', () => {
  const appStore = useAppStore();

  const notes = ref<Note[]>([]);

  const loadNotes = async () => {
    const _notes = await api.getNotes({ authToken: appStore.user?.token });
    notes.value = _notes;
  };

  const addNote = async ({ text }: { text: string }) => {
    const note = await api.addNote({ text }, { authToken: appStore.user?.token });
    notes.value.push(note);
  };

  const updateNote = async ({ id, text }: { id: number; text: string }) => {
    const updatedNote = await api.updateNote({ id, text }, { authToken: appStore.user?.token });
    const noteIndex = notes.value.findIndex((n) => n.id === id);
    notes.value.splice(noteIndex, 1, updatedNote);
  };

  const removeNote = async (id: number) => {
    await api.deleteNote({ id }, { authToken: appStore.user?.token });
    const index = notes.value.findIndex((note) => note.id === id);
    notes.value.splice(index, 1);
  };

  // Modal open helpers - TODO replace
  const openAddStickyNoteModal = () => {};

  return {
    notes,
    loadNotes,
    addNote,
    updateNote,
    removeNote,
    openAddStickyNoteModal,
  };
});
