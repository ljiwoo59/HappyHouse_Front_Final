import { wordList } from "@/api/word.js";

const wordStore = {
  namespaced: true,
  state: {
    words: [],
  },
  mutations: {
    SETWORDS: (state, payload) => {
      state.words = payload;
    },
  },
  actions: {
    getWords: ({ commit }) => {
      wordList(
        ({ data }) => {
          commit("SETWORDS", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default wordStore;
