import Vue from 'vue';
import vClickOutside from 'v-click-outside';
import App from '@/components/App/App.vue';
import store from './store';

Vue.config.productionTip = false;

Vue.use(vClickOutside);

new Vue({
  store,
  render(h) { return h(App); },
}).$mount('#app');
