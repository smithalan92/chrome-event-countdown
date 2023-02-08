import { ref } from 'vue';
import { defineStore } from 'pinia';
import * as api from '../api/api';
import { get, set } from '../utils/storage';
import { computed } from 'vue';
import { useAppStore } from './app';
import type { Event } from '../api/api.types';

export const useEventStore = defineStore('events', () => {
  const appStore = useAppStore();

  const events = ref<Event[]>([]);

  const sortedEvents = computed<Event[]>(() => {
    return events.value.sort((a, b) => {
      if (a.order > b.order) return 1;
      if (a.order < b.order) return -1;
      return 0;
    });
  });

  const isReorderingEvents = ref(false);

  const restoreEvents = async () => {
    const _events = await get<Event[] | null>('events');

    _events?.forEach((event) => {
      event.eventDate = new Date(event.eventDate);
    });

    events.value = _events ?? [];
  };

  const addEvent = async ({ name, date, background, cityId }: { name: string; date: string; background: string; cityId: number }) => {
    let event: Event;
    if (appStore.isLoggedIn) {
      event = await api.addEvent({ name, date, background, cityId }, { authToken: appStore.user?.token });
    } else {
      event = {} as any;
    }

    events.value.push(event);
    set('events', events.value);
  };

  const removeEvent = async (eventId: number) => {
    await api.deleteEvent({ eventId }, { authToken: appStore.user?.token });
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
    const event = await api.updateEvent({ eventId, name, date, background, cityId }, { authToken: appStore.user?.token });
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
      const _events = await api.reorderEvents({ eventIds: newOrderIds }, { authToken: appStore.user?.token });
      _events.forEach((event) => {
        event.eventDate = new Date(event.eventDate);
      });

      events.value = _events;
      set('events', _events);
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
    set('events', _events);
  };

  // Modal open helpers - TODO replace
  const openAddEventModal = (_event?: Event) => {};

  return {
    events,
    sortedEvents,
    isReorderingEvents,
    restoreEvents,
    loadEvents,
    reorderEvents,
    addEvent,
    removeEvent,
    updateEvent,
    openAddEventModal,
  };
});
