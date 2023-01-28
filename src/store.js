import Vue from 'vue';
import Vuex from 'vuex';
import { set } from '@/utils/storage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],
    notes: [],
  },

  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },

    REMOVE_EVENT(state, eventId) {
      const index = state.events.findIndex((event) => event.eventId === eventId);
      state.events.splice(index, 1);
    },

    SET_EVENTS(state, events) {
      state.events = events;
    },

    UPDATE_EVENT(state, event) {
      const eventIndex = state.events.findIndex((e) => e.eventId === event.eventId);

      if (eventIndex > -1) {
        state.events.splice(eventIndex, 1, event);
      }
    },

    ADD_NOTE(state, note) {
      state.notes.push(note);
    },

    REMOVE_NOTE(state, id) {
      const index = state.notes.findIndex((note) => note.id === id);
      state.notes.splice(index, 1);
    },

    SET_NOTES(state, notes) {
      state.notes = notes;
    },
  },

  actions: {
    setEvents({ commit }, events) {
      commit('SET_EVENTS', events);
    },

    addEvent({ commit }, event) {
      commit('ADD_EVENT', event);
    },

    removeEvent({ commit }, eventId) {
      commit('REMOVE_EVENT', eventId);
    },

    syncEvents({ state }) {
      set('events', state.events);
    },

    updateEvent({ commit }, event) {
      commit('UPDATE_EVENT', event);
    },

    setNotes({ commit }, notes) {
      commit('SET_NOTES', notes);
    },

    addNote({ commit }, note) {
      commit('ADD_NOTE', note);
    },

    removeNote({ commit }, id) {
      commit('REMOVE_NOTE', id);
    },

    syncNotes({ state }) {
      set('notes', state.notes);
    },

    openAddEventModal() {},

    openAddStickyNoteModal() {},
  },
});
