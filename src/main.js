import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

import App from './App.vue'
import router from './router'
import store from './store'
import '@/misc/register-service-worker'
import '@/misc/handle-network-status'
import '@/firebase/init'
import '@/firebase/authentication'
import '@/misc/handle-apple-install-prompt'
import 'pwacompat'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAS1Z8dfGV4N6QtuDhaFpq1pIQvAly6LTw',
    libraries: '',
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// eslint-disable-next-line no-console
console.info(`
🍱 This app was bootstrapped with bento-starter 🍱

👉 https://bento-starter.netlify.com/

`)
