import Vue from "vue";
import Vuex from "vuex";
import system from "./modules/system";
import user from "./modules/user";
import getters from "./getters";
Vue.use(Vuex);

const store = new Vuex.Store({
  getters,
  modules: {
    system,
    user
  }
});

export default store;
