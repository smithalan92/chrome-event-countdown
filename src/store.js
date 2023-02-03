import { createStore } from 'vuex';
import { addEvent, deleteEvent, getAppData, login, updateEvent } from './api';
import { get, set } from './utils/storage';

export default createStore({
  state: {
    events: [],
    notes: [],
    user: null,
  },

  mutations: {
    RESTORE_STATE(state, { user, events }) {
      state.user = user;
      state.events = events;
    },

    ADD_EVENT(state, event) {
      state.events.push(event);
    },

    SET_EVENTS(state, events) {
      state.events = events;
    },

    REMOVE_EVENT(state, eventId) {
      const index = state.events.findIndex((event) => event.id === eventId);
      state.events.splice(index, 1);
    },

    UPDATE_EVENT(state, event) {
      const eventIndex = state.events.findIndex((e) => e.id === event.id);

      if (eventIndex > -1) {
        state.events.splice(eventIndex, 1, event);
      }
    },

    ADD_NOTE(state, note) {
      state.notes.push(note);
    },

    UPDATE_NOTE(state, { noteId, text }) {
      const noteIndex = state.notes.findIndex((n) => n.id === noteId);
      const note = state.notes[noteIndex];
      if (noteIndex > -1) {
        state.notes.splice(noteIndex, 1, { ...note, text });
      }
    },

    REMOVE_NOTE(state, id) {
      const index = state.notes.findIndex((note) => note.id === id);
      state.notes.splice(index, 1);
    },

    SET_USER(state, user) {
      state.user = user;
    },
  },

  actions: {
    syncState({ state }) {
      set('user', state.user);
    },

    async restoreState({ commit }) {
      const user = await get('user');
      const events = await get('events');

      events.forEach((event) => {
        event.eventDate = new Date(event.eventDate);
      });

      commit('RESTORE_STATE', { user, events });
    },

    async addEvent({ commit, state }, { name, date, background, cityId }) {
      const event = await addEvent({ name, date, background, cityId }, { authToken: state.user.token });
      commit('ADD_EVENT', event);
    },

    setEvents({ commit }, events) {
      commit('SET_EVENTS', events);
    },

    async removeEvent({ commit, state }, eventId) {
      await deleteEvent({ eventId }, { authToken: state.user.token });
      commit('REMOVE_EVENT', eventId);
    },

    async updateEvent({ commit, state }, { eventId, name, date, background, cityId }) {
      const event = await updateEvent({ eventId, name, date, background, cityId }, { authToken: state.user.token });
      commit('UPDATE_EVENT', event);
    },

    addNote({ commit }, note) {
      commit('ADD_NOTE', note);
    },

    updateNote({ commit }, { noteId, text }) {
      commit('UPDATE_NOTE', { noteId, text });
    },

    removeNote({ commit }, id) {
      commit('REMOVE_NOTE', id);
    },

    async login({ commit }, { email, password }) {
      const { user, token } = await login({ email, password });

      commit('SET_USER', {
        id: user.id,
        email: user.email,
        token: token,
      });
    },

    async loadAppData({ commit, state }) {
      if (!state.user) return;
      const { events } = await getAppData(state.user.token);

      events.forEach((event) => {
        event.eventDate = new Date(event.eventDate);
      });

      commit('SET_EVENTS', events);
      set('events', events);
    },

    async startApp({ dispatch }) {
      await dispatch('restoreState');
      dispatch('loadAppData');
    },

    openAddEventModal() {},

    openAddStickyNoteModal() {},

    openSettingsModal() {},
  },
});
