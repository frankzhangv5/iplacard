// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import 'animate.css/animate.min.css';

// neon glow animates
import './assets/neon.css';

// fonts
import './fonts/stylesheet.css';

// JS plugin import
import Vue from 'vue';
import Vuex from 'vuex';
import VueOnsen from 'vue-onsenui';
import VueI18n from 'vue-i18n';

// File import
import store from './store/store.js';
import App from './App.vue';
import CustomToolbar from './components/CustomToolbar.vue';
import Effect from './components/Effect.vue';

import configs from "./assets/configs.json";

Vue.use(Vuex);
Vue.use(VueOnsen);
Vue.use(VueI18n);
Vue.prototype.$configs = configs;

Vue.config.productionTip = false

// Register components globally
Vue.component('custom-toolbar', CustomToolbar);
Vue.component('effect', Effect);

const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'en_US',
  fallbackLocale: 'en_US',
  messages: {
    'zh_CN': require('./lang/zh_CN'),
    'en_US': require('./lang/en_US')
  }
})

new Vue({
  i18n: i18n,
  render: h => h(App),
  store: store,
  beforeCreate() {
    // Shortcut for Material Design
    // Vue.prototype.md = this.$ons.platform.isAndroid();
    Vue.prototype.md = true; // for desktop debug

    // Set iPhoneX flag based on URL
    if (window.location.search.match(/iphonex/i)) {
      document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
      document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
    }
  }
}).$mount('#app')
