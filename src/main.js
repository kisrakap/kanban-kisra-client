import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import GoogleSignInButton from "vue-google-signin-button-directive";

Vue.config.productionTip = false;
Vue.use(GoogleSignInButton);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
