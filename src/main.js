import { createApp } from 'vue';
import { createPinia } from 'pinia';
import vClickOutside from 'v-click-outside';
import App from './components/App.vue';

import './index.css';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

// vCLickOutside doesnt have vue-3 compatable directive bindings
// even though it supports vue 3, probably a bug
const { bind, unbind } = vClickOutside.directive;
app.directive('click-outside', {
  mounted(el, bindling) {
    bind(el, { value: bindling.value });
  },
  beforeUnmount(el) {
    unbind(el);
  },
});

app.mount('#app');
