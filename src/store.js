import { createStore } from 'vuex';
import { get, set } from './utils/storage';

export default createStore({
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

    SET_EVENTS(state, events) {
      state.events = events;
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
  },

  actions: {
    syncState({ state }) {
      const data = {
        events: state.events,
        notes: state.notes,
      };

      set('data', data);
    },

    async restoreState({ commit }) {
      const data = await get('data');

      if (data) {
        if (data.events) {
          data.events.forEach((event) => {
            event.eventDate = new Date(event.eventDate);
          });
        }
        commit('RESTORE_STATE', data);
      }
    },

    addEvent({ commit }, event) {
      commit('ADD_EVENT', event);
    },

    setEvents({ commit }, events) {
      commit('SET_EVENTS', events);
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

    updateNote({ commit }, { noteId, text }) {
      commit('UPDATE_NOTE', { noteId, text });
    },

    removeNote({ commit }, id) {
      commit('REMOVE_NOTE', id);
    },

    openAddEventModal() {},

    openAddStickyNoteModal() {},

    openSettingsModal() {},
  },
});
