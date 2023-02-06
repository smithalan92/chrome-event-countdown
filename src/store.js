import { ref } from 'vue';
import { defineStore } from 'pinia';
import * as api from './api';
import { get, set } from './utils/storage';
import { computed } from 'vue';

export const useAppStore = defineStore('app', () => {
  const events = ref([]);

  const sortedEvents = computed(() => {
    return events.value.sort((a, b) => {
      if (a.order > b.order) return 1;
      if (a.order < b.order) return -1;
      return 0;
    });
  });
  const isReorderingEvents = ref(false);

  const notes = ref([]);
  const user = ref(null);

  const syncState = () => {
    set('user', user.value);
  };

  const restoreState = async () => {
    const _user = await get('user');
    const _events = await get('events');

    _events.forEach((event) => {
      event.eventDate = new Date(event.eventDate);
    });

    user.value = _user;
    events.value = _events;
  };

  const setEvents = (_events) => {
    events.value = _events;
  };

  const addEvent = async ({ name, date, background, cityId }) => {
    const event = await api.addEvent({ name, date, background, cityId }, { authToken: user.value.token });
    events.value.push(event);
    set('events', events.value);
  };

  const removeEvent = async (eventId) => {
    await api.deleteEvent({ eventId }, { authToken: user.value.token });
    const index = events.value.findIndex((event) => event.id === eventId);
    events.value.splice(index, 1);
    set('events', events.value);
  };

  const updateEvent = async ({ eventId, name, date, background, cityId }) => {
    const event = await api.updateEvent({ eventId, name, date, background, cityId }, { authToken: user.value.token });
    const eventIndex = events.value.findIndex((e) => e.id === event.id);
    events.value.splice(eventIndex, 1, event);
    set('events', events.value);
  };

  const reorderEvents = async (newlyOrderedEvents) => {
    isReorderingEvents.value = true;

    const originalEventOrder = events.value;
    events.value = newlyOrderedEvents.map((e, index) => {
      e.order = index + 1;
      return e;
    });
    const newOrderIds = newlyOrderedEvents.map((event) => event.id);
    try {
      const _events = await api.reorderEvents({ eventIds: newOrderIds }, { authToken: user.value.token });
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

  const addNote = (note) => {
    notes.value.push(note);
  };

  const updateNote = ({ noteId, text }) => {
    const noteIndex = notes.value.findIndex((n) => n.id === noteId);
    const note = notes.value[noteIndex];
    notes.value.splice(noteIndex, 1, { ...note, text });
  };

  const removeNote = (id) => {
    const index = notes.value.findIndex((note) => note.id === id);
    notes.value.splice(index, 1);
  };

  const login = async ({ email, password }) => {
    const { user, token } = await api.login({ email, password });

    user.value = {
      id: user.id,
      email: user.email,
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
  const openAddEventModal = () => {};
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
