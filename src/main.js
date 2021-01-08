import { createApp } from 'vue';
import App from '@/components/App/App.vue';
import store from '@/store';
import vClickOutside from '@/utils/v-click-outside';

const vueApp = createApp(App);

vueApp.use(store);
vueApp.directive('click-outside', vClickOutside);

vueApp.mount('#app');
