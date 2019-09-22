import Vue from 'vue';
import Vuex from 'vuex';
import { set } from '@/utils/storage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [],
  },

  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },

    REMOVE_EVENT(state, eventId) {
      const index = state.events.findIndex(event => event.eventId === eventId);
      state.events.splice(index, 1);
    },

    SET_EVENTS(state, events) {
      state.events = events;
    },

    UPDATE_EVENT(state, event) {
      console.log(event);
      const eventIndex = state.events.findIndex(e => e.eventId === event.eventId);
      console.log(eventIndex);
      if (eventIndex > -1) {
        state.events.splice(eventIndex, 1, event);
      }
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

    openAddEventModal() {},
  },
});
