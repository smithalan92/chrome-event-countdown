import { ref } from 'vue';
import { defineStore } from 'pinia';
import * as api from '../api/api';
import { get, set } from '../utils/storage';
import { computed } from 'vue';
import { useNoteStore } from './notes';
import { useEventStore } from './events';
import type { AppUser } from './app.types';
import { useGeoStore } from './geo';

const STORAGE_KEY = 'user_v1';

export const useAppStore = defineStore('app', () => {
  const noteStore = useNoteStore();
  const eventStore = useEventStore();
  const geoStore = useGeoStore();

  const user = ref<AppUser | null>(null);

  const isLoggedIn = computed(() => user.value !== null);

  const syncToStorage = () => {
    set(STORAGE_KEY, user.value);
  };

  const syncFromStorage = async () => {
    const _user = await get<AppUser>(STORAGE_KEY);
    user.value = _user;
  };

  const restoreState = () => {
    syncFromStorage();
    eventStore.syncFromStorage();
    noteStore.syncFromStorage();
  };

  const login = async ({ email, password }: { email: string; password: string }) => {
    const { user: _user, token } = await api.login({ email, password });

    user.value = {
      id: _user.id,
      email: _user.email,
      token: token,
    };

    syncToStorage();

    Promise.all([eventStore.loadEvents(), noteStore.loadNotes()]);
  };

  const logout = () => {
    user.value = null;
    syncToStorage();
    eventStore.resetEvents();
    noteStore.resetNotes();
  };

  const loadAppData = async () => {
    geoStore.loadCountries();
    if (!user.value) return;
    noteStore.loadNotes();
    eventStore.loadEvents();
  };

  const startApp = async () => {
    await restoreState();
    await loadAppData();
  };

  // Modal open helpers - TODO replace
  const openSettingsModal = () => {};

  return {
    user,
    isLoggedIn,
    syncFromStorage,
    syncToStorage,
    restoreState,
    login,
    logout,
    loadAppData,
    startApp,
    openSettingsModal,
  };
});
