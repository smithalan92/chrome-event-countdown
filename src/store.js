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
    RESTORE_STATE(state, data) {
      state.events = data.events || [];
      state.notes = data.notes || [];
    },

    ADD_EVENT(state, event) {
      state.events.push(event);
    },

    REMOVE_EVENT(state, eventId) {
      const index = state.events.findIndex((event) => event.eventId === eventId);
      state.events.splice(index, 1);
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
  },

  actions: {
    syncState({ state }) {
      const data = {
        events: state.events,
        notes: state.notes,
      };

      set('data', data);
    },

    restoreState({ commit }, data) {
      commit('RESTORE_STATE', data);
    },

    addEvent({ commit }, event) {
      commit('ADD_EVENT', event);
    },

    removeEvent({ commit }, eventId) {
      commit('REMOVE_EVENT', eventId);
    },

    updateEvent({ commit }, event) {
      commit('UPDATE_EVENT', event);
    },

    addNote({ commit }, note) {
      commit('ADD_NOTE', note);
    },

    removeNote({ commit }, id) {
      commit('REMOVE_NOTE', id);
    },

    openAddEventModal() {},

    openAddStickyNoteModal() {},
  },
});
