import Vue from "vue";
import Vuex from "vuex";
import axios from "./axios-common";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import houseStore from "@/store/modules/houseStore.js";
import wordStore from "@/store/modules/wordStore.js";
import memberStore from "@/store/modules/memberStore.js";

export default new Vuex.Store({
  state: {
    Qna: {},
    Qnas: [],
  },
  getters: {
    Qnas(state) {
      return state.Qnas;
    },
  },
  mutations: {
    ALLQNA: (state, payload) => {
      state.Qnas = payload.Qnas;
    },
    DETAILQNA: (state, payload) => {
      state.Qna = payload;
    },
    SETREPLY: (state, payload) => {
      state.Qna.reply = payload;
    },
  },
  actions: {
    ALLQNA: (store) => {
      axios.get("/qna").then((response) => {
        console.log(response.data);
        store.commit("ALLQNA", { Qnas: response.data });
      });
    },
    ADDQNA: (store, payload) => {
      axios
        .post("/qna", {
          id: payload.id,
          title: payload.title,
          content: payload.content,
        })
        .then(() => {
          store.dispatch("ALLQNA");
        });
    },
    SEARCH: (store, payload) => {
      axios.get("/qna/find/" + payload).then((response) => {
        store.commit("ALLQNA", { Qnas: response.data });
      });
    },
    MODIFY: (store, payload) => {
      axios
        .put("/qna", {
          num: payload.num,
          title: payload.title,
          content: payload.content,
          reply: payload.reply,
        })
        .then(() => {
          store.dispatch("DETAILQNA", payload.num);
        });
    },
    DETAILQNA: (store, payload) => {
      axios.get("/qna/" + payload).then((response) => {
        store.commit("DETAILQNA", response.data);
      });
    },
    DELETEQNA: (store, payload) => {
      axios.delete("/qna/" + payload).then(() => {
        store.dispatch("ALLQNA");
      });
    },
  },
  modules: {
    houseStore,
    wordStore,
    memberStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});
