import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { registerComponents } from './utils/components';

Vue.config.productionTip = false;
registerComponents();

new Vue({
  router,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
