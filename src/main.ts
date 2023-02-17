import { createApp } from 'vue';
import { createPinia } from 'pinia';
// @ts-expect-error missing types
import vClickOutside from 'v-click-outside';
import App from './components/App.vue';
/* @ts-expect-error */
import { SetupCalendar } from 'v-calendar';

import './index.css';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(SetupCalendar, {});

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
