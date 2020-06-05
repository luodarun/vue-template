import Vue from "vue";
import App from "./App.vue";
import store from "./store/index";
import router from "./router/index";
import LrUI from "lr-vue-components";
import "lr-vue-components/lib/theme-chalk/index.css";
import "normalize.css";
import "./styles/index.scss";
import "./router/permission";
import "./utils/error-log";
Vue.use(LrUI);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
