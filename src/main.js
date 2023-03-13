import Vue from 'vue'
import App from './App.vue'
import router from './router'
import GoogleSignInButton from 'vue-google-signin-button-directive'
Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App),
  GoogleSignInButton,
}).$mount('#app')
