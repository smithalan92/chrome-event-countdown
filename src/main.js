import { createApp } from "vue";
import vClickOutside from "v-click-outside";
import App from "./components/App.vue";
import store from "./store";

import "./index.css";

const app = createApp(App);

app.use(store);

// vCLickOutside doesnt have vue-3 compatable directive bindings
// even though it supports vue 3, probably a bug
const { bind, unbind } = vClickOutside.directive;
app.directive("click-outside", {
  mounted(el, bindling) {
    bind(el, { value: bindling.value });
  },
  beforeUnmount(el) {
    unbind(el);
  },
});

app.mount("#app");
