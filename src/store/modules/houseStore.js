import { sidoList, gugunList, dongList, houseList, housename } from "@/api/house.js";

const houseStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "시/도" }],
    guguns: [{ value: null, text: "구/군" }],
    dongs: [{ value: null, text: "읍/면/동" }],
    houses: [],
    houses2: [],
    house: null,
    dongName: ""
  },

  getters: {},

  mutations: {
    SET_DONG_NAME: (state, name) => {
        state.dongName = name;
    },
    SET_SIDO_LIST: (state, sidos) => {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST: (state, guguns) => {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
    SET_DONG_LIST: (state, dongs) => {
      dongs.forEach((dong) => {
        state.dongs.push({ value: dong.dongName, text: dong.dongName });
      });
    },
    CLEAR_SIDO_LIST: (state) => {
      state.sidos = [{ value: null, text: "시/도" }];
    },
    CLEAR_GUGUN_LIST: (state) => {
      state.guguns = [{ value: null, text: "구/군" }];
    },
    CLEAR_DONG_LIST: (state) => {
      state.dongs = [{ value: null, text: "읍/면/동" }];
    },
    CLEAR_HOUSE_LIST: (state) => {
        state.houses = [];
    },
    CLEAR_HOUSE2_LIST: (state) => {
        state.houses2 = [];
    },
    SET_HOUSE_LIST: (state, houses) => {
      houses.forEach(house => {
        if (house.법정동.trim() == state.dongName) state.houses.push(house);
      });
      // state.houses = houses;
    },
    SET_HOUSE2_LIST: (state, houses) => {
        state.houses2 = houses;
      },
    SET_DETAIL_HOUSE: (state, house) => {
      state.house = house;
    },
  },

  actions: {
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getGugun: ({ commit }, sidoCode) => {
      const params = {
        sido: sidoCode,
      };
      gugunList(
        params,
        ({ data }) => {
          // console.log(commit, response);
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDong: ({ commit }, gugunCode) => {
      const params = {
        gugun: gugunCode,
      };
      dongList(
        params,
        ({ data }) => {
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getHouseList: ({ commit }, gugunCode) => {
      const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;

      const params = {
        pageNo:encodeURIComponent('1'),
        numOfRows:encodeURIComponent('1000'),
        LAWD_CD: gugunCode,
        DEAL_YMD: "202110",
        serviceKey: decodeURIComponent(SERVICE_KEY),
      };
      houseList(
        params,
        (response) => {
        //   console.log(response.data);
          commit("SET_HOUSE_LIST", response.data.response.body.items.item);
          commit("CLEAR_HOUSE2_LIST");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getHouseName: ({ commit }, aptName) => {
        const params = {aptName : aptName, lat : 0, lng : 0};
        housename(
        params,
        (response) => {
            commit("SET_HOUSE2_LIST", response.data);
            commit("CLEAR_HOUSE_LIST");
        },
        (error) => {
            console.log(error);
        }
        );
    },


    detailHouse: ({ commit }, house) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      commit("SET_DETAIL_HOUSE", house);
    },
  },
};

export default houseStore;
