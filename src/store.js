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
  },

  actions: {
    setEvents({ commit }, events) {
      events.forEach(event => commit('ADD_EVENT', event));
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
  },
});
