import { ref } from 'vue';
import { defineStore } from 'pinia';
import * as api from '../api/api';
import { get, set } from '../utils/storage';
import { computed } from 'vue';
import type { Event, Note } from '../api/api.types';
import type { AppUser } from './app.types';

export const useAppStore = defineStore('app', () => {
  const events = ref<Event[]>([]);

  const sortedEvents = computed<Event[]>(() => {
    return events.value.sort((a, b) => {
      if (a.order > b.order) return 1;
      if (a.order < b.order) return -1;
      return 0;
    });
  });

  const isReorderingEvents = ref(false);

  const notes = ref<Note[]>([]);
  const user = ref<AppUser | null>(null);

  const syncState = () => {
    set('user', user.value);
  };

  const restoreState = async () => {
    const _user = await get<AppUser | null>('user');
    const _events = await get<Event[] | null>('events');

    _events?.forEach((event) => {
      event.eventDate = new Date(event.eventDate);
    });

    user.value = _user;
    events.value = _events ?? [];
  };

  const setEvents = (_events: Event[]) => {
    events.value = _events;
  };

  const addEvent = async ({ name, date, background, cityId }: { name: string; date: string; background: string; cityId: number }) => {
    const event = await api.addEvent({ name, date, background, cityId }, { authToken: user.value?.token });
    events.value.push(event);
    set('events', events.value);
  };

  const removeEvent = async (eventId: number) => {
    await api.deleteEvent({ eventId }, { authToken: user.value?.token });
    const index = events.value.findIndex((event) => event.id === eventId);
    events.value.splice(index, 1);
    set('events', events.value);
  };

  const updateEvent = async ({
    eventId,
    name,
    date,
    background,
    cityId,
  }: {
    eventId: number;
    name: string;
    date: string;
    background: string;
    cityId: number;
  }) => {
    const event = await api.updateEvent({ eventId, name, date, background, cityId }, { authToken: user.value?.token });
    const eventIndex = events.value.findIndex((e) => e.id === event.id);
    events.value.splice(eventIndex, 1, event);
    set('events', events.value);
  };

  const reorderEvents = async (newlyOrderedEvents: Event[]) => {
    isReorderingEvents.value = true;

    const originalEventOrder: Event[] = events.value;
    events.value = newlyOrderedEvents.map((e, index) => {
      e.order = index + 1;
      return e;
    });
    const newOrderIds = newlyOrderedEvents.map((event) => event.id);
    try {
      const _events = await api.reorderEvents({ eventIds: newOrderIds }, { authToken: user.value?.token });
      _events.forEach((event) => {
        event.eventDate = new Date(event.eventDate);
      });

      setEvents(_events);
      set('events', events.value);
    } catch (e) {
      events.value = originalEventOrder;
    } finally {
      isReorderingEvents.value = false;
    }
  };

  const addNote = (note: Note) => {
    notes.value.push(note);
  };

  const updateNote = ({ noteId, text }: { noteId: number; text: string }) => {
    const noteIndex = notes.value.findIndex((n) => n.id === noteId);
    const note = notes.value[noteIndex];
    notes.value.splice(noteIndex, 1, { ...note, text });
  };

  const removeNote = (id: number) => {
    const index = notes.value.findIndex((note) => note.id === id);
    notes.value.splice(index, 1);
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
    if (!user.value) return;
    const { events: _events } = await api.getAppData(user.value.token);

    _events.forEach((event) => {
      event.eventDate = new Date(event.eventDate);
    });

    setEvents(_events);
    set('events', _events);
  };

  const startApp = async () => {
    await restoreState();
    await loadAppData();
  };

  // Modal open helpers - TODO replace
  const openAddEventModal = (_event?: Event) => {};
  const openAddStickyNoteModal = () => {};
  const openSettingsModal = () => {};

  return {
    user,
    events,
    sortedEvents,
    isReorderingEvents,
    notes,
    syncState,
    restoreState,
    setEvents,
    reorderEvents,
    addEvent,
    removeEvent,
    updateEvent,
    addNote,
    updateNote,
    removeNote,
    login,
    loadAppData,
    startApp,
    openAddEventModal,
    openAddStickyNoteModal,
    openSettingsModal,
  };
});
