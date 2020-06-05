import { getToken, setToken, removeToken } from "@/utils/system";
import { resetRouter } from "@/router";
// eslint-disable-next-line no-unused-vars
import { setStore, getStore } from "@/utils/store";

const state = {
  token: getToken(),
  name: getStore({ name: "name" }) || "",
  roles: []
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },

  SET_NAME: (state, name) => {
    state.name = name;
    setStore({ name: "name", content: state.name, type: "session" });
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  }
};

const actions = {
  login({ commit }, username) {
    return new Promise(resolve => {
      commit("SET_NAME", username);
      commit("SET_TOKEN", "isLogin");
      setToken("isLogin");
      resolve();
    });
  },

  // get user info
  getInfo({ commit }) {
    return new Promise(resolve => {
      commit("SET_ROLES", ["Admin"]);
      resolve();
    });
  },

  // user logout
  logout({ commit, dispatch }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resetRouter();
      dispatch("clearALLRouterView");
      resolve();
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve();
    });
  }
};

export default {
  state,
  mutations,
  actions
};
