<template>
  <div>
    <section id="index_section">
      <div class="card col-sm-12 mt-1" style="min-height: 850px">
        <!-- <div class="card-body"> -->
          <b-row class="mt-4 mb-4 text-center">
            <b-col class="sm-3">
              <b-form-select
                v-model="sidoCode"
                :options="sidos"
                @change="gugunList"
              ></b-form-select>
            </b-col>
            <b-col class="sm-3">
              <b-form-select
                v-model="gugunCode"
                :options="guguns"
                @change="dongList"
              ></b-form-select>
            </b-col>
            <b-col class="sm-3">
              <b-form-select
                v-model="dongCode"
                :options="dongs"
                @change="searchApt"
              ></b-form-select>
            </b-col>
            <b-col class="sm-3">
              <b-form-input
                v-model="aptName"
                placeholder="아파트 검색"
                @keyup.enter="search"
              ></b-form-input>
            </b-col>
            <b-button variant="outline-info" @click="search">검색</b-button>
          </b-row>

          <div class="row">
            <div class="col-xl-8 mb-5 mb-xl-0">
              <div class="card bg-default">
              <!-- <card type="default" header-classes="bg-transparent"> -->
          <ka-kao-map ref="KaKaoMap" />
              <!-- </card> -->
              </div>
          </div>

          <!-- <div class="overflow-auto" v-if="houses.length != 0"> -->
          <div class="col-xl-4" v-if="houses2.length == 0">
            <b-table
              hover
              id="housetable"
              head-variant="light"
              :items="houses"
              :fields="fields"
              :per-page="perPage"
              :current-page="currentPage"
            ></b-table>

            <b-pagination
              v-model="currentPage"
              :total-rows="houses.length"
              :per-page="perPage"
              aria-controls="housetable"
            ></b-pagination>
          </div>

          <div class="col-xl-4" v-if="houses.length == 0 && houses2.length != 0">
            <b-table
              hover
              id="house2table"
              head-variant="light"
              :items="houses2"
              :fields="fields2"
              :per-page="perPage"
              :current-page="currentPage"
            ></b-table>

            <b-pagination
              v-model="currentPage"
              :total-rows="houses2.length"
              :per-page="perPage"
              aria-controls="house2table"
            ></b-pagination>
          </div>
          </div>

          
          <br>
          <word />

        <!-- </div> -->
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import KaKaoMap from "./KaKaoMap.vue";
import Word from "@/views/main/Word.vue"

const houseStore = "houseStore";
const wordStore = "wordStore";

export default {
  components: { KaKaoMap, Word },
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      dongCode: null,
      aptName: "",
      currentPage: 1,
      perPage: 13,

      fields: [
        {
          key: "일련번호",
          label: "번호",
        },
        {
          key: "아파트",
          label: "아파트",
        },
        {
          key: "도로명",
          label: "주소",
        },
        {
          key: "건축년도",
          label: "건축년도",
        },
        {
          key: "거래금액",
          label: "거래금액",
        },
        {
          key: "법정동",
          label: "법정동",
        },
      ],
      fields2: [
        {
          key: "aptCode",
          label: "번호",
        },
        {
          key: "aptName",
          label: "아파트",
        },
        {
          key: "jibun",
          label: "주소",
        },
        {
          key: "buildYear",
          label: "건축년도",
        },
        {
          key: "recentPrice",
          label: "거래금액",
        },
        {
          key: "dongName",
          label: "법정동",
        },
      ],
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns", "dongs", "houses", "houses2"]),
  },
  created() {
    this.CLEAR_SIDO_LIST();
    this.CLEAR_GUGUN_LIST();
    this.CLEAR_HOUSE_LIST();
    this.CLEAR_HOUSE2_LIST();
    this.getSido();
    this.getWords();
  },
  methods: {
    ...mapActions(houseStore, ["getSido", "getGugun", "getDong", "getHouseList", "getHouseName"]),
    ...mapActions(wordStore, ["getWords"]),
    ...mapMutations(houseStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
      "CLEAR_HOUSE_LIST",
      "CLEAR_HOUSE2_LIST",
      "SET_DONG_NAME",
    ]),

    gugunList() {
      this.CLEAR_GUGUN_LIST();
      this.CLEAR_DONG_LIST();
      this.CLEAR_HOUSE_LIST();
      this.CLEAR_HOUSE2_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    dongList() {
      this.CLEAR_DONG_LIST();
      this.CLEAR_HOUSE_LIST();
      this.CLEAR_HOUSE2_LIST();
      this.dongCode = null;
      if (this.gugunCode) this.getDong(this.gugunCode);
    },
    searchApt() {
      if (this.dongCode) {
        this.currentPage = 1;
        this.CLEAR_HOUSE_LIST();
        this.CLEAR_HOUSE2_LIST();
        this.SET_DONG_NAME(this.dongCode);
        this.getHouseList(this.gugunCode);
      }
    },
    search() {
      if (this.aptName == "") alert("검색어를 입력해주세요.");
      else {
        this.currentPage = 1;
        this.CLEAR_HOUSE_LIST();
        this.CLEAR_HOUSE2_LIST();
        this.getWords();
        this.getHouseName(this.aptName);
      }
    },
  },
};
</script>

<style>

</style>
