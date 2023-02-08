import { ref } from 'vue';
import { defineStore } from 'pinia';
import * as api from '../api/api';
import { get, set } from '../utils/storage';
import { computed } from 'vue';
import { useNoteStore } from './notes';
import { useEventStore } from './events';
import type { AppUser } from './app.types';
import { useGeoStore } from './geo';

export const useAppStore = defineStore('app', () => {
  const noteStore = useNoteStore();
  const eventStore = useEventStore();
  const geoStore = useGeoStore();

  const user = ref<AppUser | null>(null);

  const isLoggedIn = computed(() => user.value !== null);

  const syncState = () => {
    set('user', user.value);
  };

  const restoreState = async () => {
    const _user = await get<AppUser | null>('user');
    user.value = _user;

    eventStore.restoreEvents();
  };

  const login = async ({ email, password }: { email: string; password: string }) => {
    const { user: _user, token } = await api.login({ email, password });

    user.value = {
      id: _user.id,
      email: _user.email,
      token: token,
    };
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
    syncState,
    restoreState,
    login,
    loadAppData,
    startApp,
    openSettingsModal,
  };
});
