import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useAppStore } from './app';
import * as api from '../api/api';
import type { Note } from '../api/api.types';
import { getRandomNumber } from '@/utils/number';
import { set, get } from '@/utils/storage';

const STORAGE_KEY = 'notes_v1';

export const useNoteStore = defineStore('notes', () => {
  const appStore = useAppStore();

  const notes = ref<Note[]>([]);

  const syncToStorage = () => {
    set(STORAGE_KEY, notes.value);
  };

  const syncFromStorage = async () => {
    const _notes = await get<Note[]>(STORAGE_KEY);
    if (_notes) notes.value = _notes;
  };

  const loadNotes = async () => {
    const _notes = await api.getNotes({ authToken: appStore.user?.token });
    notes.value = _notes;
    syncToStorage();
  };

  const addNote = async ({ text }: { text: string }) => {
    let note: Note;
    if (appStore.isLoggedIn) {
      note = await api.addNote({ text }, { authToken: appStore.user?.token });
    } else {
      note = {
        id: getRandomNumber(),
        text,
      };
    }

    notes.value.push(note);
    syncToStorage();
  };

  const updateNote = async ({ id, text }: { id: number; text: string }) => {
    let updatedNote: Note;

    if (appStore.isLoggedIn) {
      updatedNote = await api.updateNote({ id, text }, { authToken: appStore.user?.token });
    } else {
      updatedNote = {
        id,
        text,
      };
    }
    const noteIndex = notes.value.findIndex((n) => n.id === id);
    notes.value.splice(noteIndex, 1, updatedNote);
    syncToStorage();
  };

  const removeNote = async (id: number) => {
    if (appStore.isLoggedIn) {
      await api.deleteNote({ id }, { authToken: appStore.user?.token });
    }
    const index = notes.value.findIndex((note) => note.id === id);
    notes.value.splice(index, 1);
    syncToStorage();
  };

  const resetNotes = () => {
    notes.value = [];
    syncToStorage();
  };

  // Modal open helpers - TODO replace
  const openAddStickyNoteModal = () => {};

  return {
    notes,
    loadNotes,
    addNote,
    updateNote,
    removeNote,
    resetNotes,
    syncToStorage,
    syncFromStorage,
    openAddStickyNoteModal,
  };
});
