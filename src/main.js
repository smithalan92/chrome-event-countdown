import Vue from 'vue';
import App from '@/components/App/App.vue';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  store,
  render(h) { return h(App); },
}).$mount('#app');
