import { ref } from 'vue';
import { defineStore } from 'pinia';
import * as api from '../api/api';
import { computed } from 'vue';
import { useAppStore } from './app';
import type { City, Country, Event } from '../api/api.types';
import { format } from 'date-fns';
import { getRandomNumber } from '@/utils/number';
import { set, get } from '@/utils/storage';

const STORAGE_KEY = 'events_v1';

export const useEventStore = defineStore('events', () => {
  const appStore = useAppStore();

  const events = ref<Event[]>([]);
  const isEventModalOpen = ref(false);
  const eventToEdit = ref<Event | null>(null);

  const sortedEvents = computed<Event[]>(() => {
    return events.value.sort((a, b) => {
      if (a.order > b.order) return 1;
      if (a.order < b.order) return -1;
      return 0;
    });
  });

  const isReorderingEvents = ref(false);

  const syncToStorage = () => {
    set(STORAGE_KEY, events.value);
  };

  const syncFromStorage = async () => {
    const _events = await get<Event[]>(STORAGE_KEY);
    if (_events) {
      _events.forEach((event) => {
        event.eventDate = new Date(event.eventDate);
      });
      events.value = _events;
    }
  };

  const resetEvents = () => {
    events.value = [];
    syncToStorage();
  };

  const addEvent = async ({
    name,
    date,
    background,
    country,
    city,
  }: {
    name: string;
    date: string;
    background: string;
    country: Country;
    city: City;
  }) => {
    let event: Event;
    if (appStore.isLoggedIn) {
      event = await api.addEvent({ name, date, background, cityId: city.id }, { authToken: appStore.user?.token });
    } else {
      event = {
        id: getRandomNumber(),
        name,
        eventDate: new Date(date),
        order: events.value.length + 1,
        background,
        country,
        city,
      };
    }

    events.value.push(event);
    syncToStorage();
  };

  const removeEvent = async (eventId: number) => {
    if (appStore.isLoggedIn) {
      await api.deleteEvent({ eventId }, { authToken: appStore.user?.token });
    }
    const index = events.value.findIndex((event) => event.id === eventId);
    events.value.splice(index, 1);
    syncToStorage();
  };

  const updateEvent = async ({
    eventId,
    name,
    date,
    background,
    country,
    city,
  }: {
    eventId: number;
    name: string;
    date: Date;
    background: string;
    country: Country;
    city: City;
  }) => {
    let event: Event;
    if (appStore.isLoggedIn) {
      const eventDate = format(date, 'yyyy-MM-dd HH:mm:00');
      event = await api.updateEvent({ eventId, name, date: eventDate, background, cityId: city.id }, { authToken: appStore.user?.token });
    } else {
      event = {
        id: eventId,
        name,
        eventDate: new Date(date),
        order: events.value.length + 1,
        background,
        country,
        city,
      };
    }
    const eventIndex = events.value.findIndex((e) => e.id === event.id);
    events.value.splice(eventIndex, 1, event);
    syncToStorage();
  };

  const reorderEvents = async (newlyOrderedEvents: Event[]) => {
    if (appStore.isLoggedIn) isReorderingEvents.value = true;

    const originalEventOrder: Event[] = events.value;
    events.value = newlyOrderedEvents.map((e, index) => {
      e.order = index + 1;
      return e;
    });

    if (!appStore.isLoggedIn) return;

    const newOrderIds = newlyOrderedEvents.map((event) => event.id);
    try {
      const _events = await api.reorderEvents({ eventIds: newOrderIds }, { authToken: appStore.user?.token });
      _events.forEach((event) => {
        event.eventDate = new Date(event.eventDate);
      });

      events.value = _events;
      syncToStorage();
    } catch (e) {
      events.value = originalEventOrder;
    } finally {
      isReorderingEvents.value = false;
    }
  };

  const loadEvents = async () => {
    const { events: _events } = await api.getEvents(appStore.user?.token);

    _events.forEach((event) => {
      event.eventDate = new Date(event.eventDate);
    });

    events.value = _events;
    syncToStorage();
  };

  const openEventModal = (_event?: Event) => {
    if (_event) eventToEdit.value = _event;
    isEventModalOpen.value = true;
  };

  const closeEventModal = () => {
    eventToEdit.value = null;
    isEventModalOpen.value = false;
  };

  return {
    events,
    sortedEvents,
    isReorderingEvents,
    isEventModalOpen,
    eventToEdit,
    resetEvents,
    syncFromStorage,
    syncToStorage,
    loadEvents,
    reorderEvents,
    addEvent,
    removeEvent,
    updateEvent,
    openEventModal,
    closeEventModal,
  };
});
