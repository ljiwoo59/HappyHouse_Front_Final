import jwt_decode from "jwt-decode";
import { login, register, update, deleteone } from "@/api/member.js";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    registStatus: false,
    userInfo: null,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, flag) => {
      state.isLogin = flag;
    },
    SET_IS_LOGIN_ERROR: (state, flag) => {
      state.isLoginError = flag;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
    SET_REGIST_STATUS: (state, flag) => {
      state.registStatus = flag;
    },
    CLEAR_USER_INFO: (state) => {
      state.isLogin = false;
      state.userInfo = null;
    }
  },
  actions: {
    async LOGIN({ commit }, user) {
      await login(
        user,
        (response) => {
          if (response.data != "") {
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_USER_INFO", response.data);
          }
          else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
            commit("CLEAR_USER_INFO");
          }
        },
        () => {}
      );
    },
    
    async REGISTER({ commit }, user) {
      await register(
        user,
        (response) => {
          if (response.data == 1) {
            commit("SET_REGIST_STATUS", false);
          }
          else {
            commit("SET_REGIST_STATUS", true);
          }
        },
        () => {}
      );
    },

    async UPDATE({ commit }, user) {
      await update(
        user,
        (response) => {
          commit("SET_USER_INFO", response.data);
        },
        () => {}
      );
    },
  },

  async DELETEONE({ commit }, user) {
    await deleteone(
      user,
      (response) => {
        commit("CLEAR_USER_INFO")
      },
      () => {}
    );
  },
};

export default memberStore;
