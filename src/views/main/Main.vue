<template>
  <div>
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100">
            <h1
              class="title"
              style="
                color: darkolivegreen;
                font-size: 65px;
                text-shadow: -1px 0 beige, 0 1px beige, 1px 0 beige, 0 -1px beige;
              "
            >
              Your Story Starts With Us.
            </h1>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center">
              <h1 class="title text-center">Search Our Properties</h1>
            </div>
          </div>
          <div class="features text-center">
            <div id="searchbar"></div>
            <b-row class="mt-4 mb-4 text-center">
              <b-col class="sm-3">
                <md-field>
                  <b-form-select
                    v-model="sidoCode"
                    :options="sidos"
                    @change="gugunList"
                    style="height: 35px; font-size: 11px; font-family: 'IBMPlexSansKR-Regular'"
                  ></b-form-select>
                </md-field>
              </b-col>
              <b-col class="sm-3">
                <md-field>
                  <b-form-select
                    v-model="gugunCode"
                    :options="guguns"
                    @change="dongList"
                    style="height: 35px; font-size: 11px; font-family: 'IBMPlexSansKR-Regular'"
                  ></b-form-select>
                </md-field>
              </b-col>
              <b-col class="sm-3">
                <md-field>
                  <b-form-select
                    v-model="dongCode"
                    :options="dongs"
                    @change="searchApt"
                    style="height: 35px; font-size: 11px; font-family: 'IBMPlexSansKR-Regular'"
                  ></b-form-select>
                </md-field>
              </b-col>
              <b-col class="sm-3">
                <md-field>
                  <label style="font-family: 'IBMPlexSansKR-Regular'">이름으로 검색</label>
                  <md-input v-model="aptName" type="text" @keyup.enter="search"></md-input>
                </md-field>
              </b-col>
              <md-button
                class="md-info md-sm"
                @click="search"
                style="height: 35px; margin-top: 12px; font-size: 12px; font-family: 'IBMPlexSansKR-Regular'"
                >검색</md-button
              >
              <b-col class="sm-3">
                <word />
              </b-col>
            </b-row>

            <div class="row">
              <div class="col-xl-7 mb-5 mb-xl-0">
                <div class="card bg-default">
                  <!-- <card type="default" header-classes="bg-transparent"> -->
                  <ka-kao-map ref="KaKaoMap" />
                  <!-- </card> -->
                </div>
              </div>

              <!-- <div class="overflow-auto" v-if="houses.length != 0"> -->
              <div class="col-xl-5" v-if="houses2.length == 0">
                <b-table
                  hover
                  id="housetable"
                  head-variant="light"
                  v-b-toggle.sidebar-1
                  :items="houses"
                  :fields="fields"
                  :per-page="perPage"
                  :current-page="currentPage"
                  @row-clicked="clickHouse"
                  style="font-size: 11px; font-family: 'IBMPlexSansKR-Regular'"
                ></b-table>

                <b-pagination
                  v-model="currentPage"
                  :total-rows="houses.length"
                  :per-page="perPage"
                  aria-controls="housetable"
                ></b-pagination>
              </div>

              <div class="col-xl-5" v-if="houses.length == 0 && houses2.length != 0">
                <b-table
                  hover
                  id="house2table"
                  head-variant="light"
                  v-b-toggle.sidebar-2
                  :items="houses2"
                  :fields="fields2"
                  :per-page="perPage"
                  :current-page="currentPage"
                  @row-clicked="clickHouse"
                  style="font-size: 11px; font-family: 'IBMPlexSansKR-Regular'"
                ></b-table>

                <b-pagination
                  v-model="currentPage"
                  :total-rows="houses2.length"
                  :per-page="perPage"
                  aria-controls="house2table"
                ></b-pagination>
              </div>
            </div>

            <b-sidebar
              id="sidebar-1"
              v-if="house != null && houses2.length == 0 && houses.length != 0"
              shadow
            >
              <div class="container" style="margin-top: 60px">
                <md-button class="md-info" style="font-weight:bold; font-family: 'IBMPlexSansKR-Regular'; font-size:15px">{{ this.house.아파트 }}</md-button>
                <b-img :src="require('../../assets/Banpo.jpg')" fluid style="margin-top: 10px"></b-img>
                <table class="tbAdd" style="font-size: 15px; margin-top:20px; font-family: 'IBMPlexSansKR-Regular';">
                  <colgroup>
                    <col width="20%" />
                    <col width="*" />
                  </colgroup>
                  <tr>
                    <th>거래금액</th>
                    <td>{{ this.house.거래금액 }}</td>
                  </tr>
                  <tr>
                    <th>건축년도</th>
                    <td>{{ this.house.건축년도 }}</td>
                  </tr>
                  <tr>
                    <th>매매날짜</th>
                    <td>{{ this.house.년 }}.{{ this.house.월 }}.{{ this.house.일 }}</td>
                  </tr>
                  <tr>
                    <th>도로명</th>
                    <td>{{ this.house.도로명 }}</td>
                  </tr>
                  <tr>
                    <th>건물코드</th>
                    <td>{{ this.house.도로명건물본번호코드 }}</td>
                  </tr>
                  <tr>
                    <th>법정동</th>
                    <td>{{ this.house.법정동 }}</td>
                  </tr>
                  <tr>
                    <th>전용면적</th>
                    <td>{{ this.house.전용면적 }}</td>
                  </tr>
                  <tr>
                    <th>층</th>
                    <td>{{ this.house.층 }}</td>
                  </tr>
                </table>
              </div>
            </b-sidebar>

            <b-sidebar
              id="sidebar-2"
              v-if="house != null && houses2.length != 0 && houses.length == 0"
              shadow
            >
              <div class="container" style="margin-top: 60px">
                <md-button class="md-info" style="font-weight:bold; font-family: 'IBMPlexSansKR-Regular'; font-size:15px">{{ this.house.aptName }}</md-button>
                <b-img :src="require('../../assets/Chundam.jpg')" fluid style="margin-top: 10px"></b-img>
                <table class="tbAdd" style="font-size: 15px; margin-top:20px; font-family: 'IBMPlexSansKR-Regular';">
                  <colgroup>
                    <col width="20%" />
                    <col width="*" />
                  </colgroup>
                  <tr>
                    <th>거래금액</th>
                    <td>{{ this.house.recentPrice }}</td>
                  </tr>
                  <tr>
                    <th>건축년도</th>
                    <td>{{ this.house.buildYear }}</td>
                  </tr>
                  <tr>
                    <th>법정동</th>
                    <td>{{ this.house.dongName }}</td>
                  </tr>
                  <tr>
                    <th>시군구</th>
                    <td>{{ this.house.sidoName }} {{ this.house.gugunName }}</td>
                  </tr>
                  <tr>
                    <th>지번</th>
                    <td>{{ this.house.jibun }}</td>
                  </tr>
                </table>
              </div>
            </b-sidebar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import KaKaoMap from "./KaKaoMap.vue";
import Word from "@/views/main/Word.vue";

const houseStore = "houseStore";
const wordStore = "wordStore";
const memberStore = "memberStore";

export default {
  components: { KaKaoMap, Word },
  props: {
    header: {
      type: String,
      default: require("@/assets/images/hero_bg_1.jpg"),
    },
  },
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      dongCode: null,
      aptName: "",
      currentPage: 1,
      perPage: 10,

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
    ...mapState(houseStore, ["sidos", "guguns", "dongs", "houses", "houses2", "house"]),
    ...mapState(memberStore, ["userInfo"]),
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
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
      "SET_HOUSE",
    ]),

    clickHouse(data) {
      this.SET_HOUSE(data);
    },

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
        this.aptName = "";
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
        if (this.userInfo != null)
          this.getHouseName({ aptName: this.aptName, gugun: this.userInfo.address });
        else this.getHouseName({ aptName: this.aptName, gugun: 0 });
      }
    },
  },
};
</script>

<style>
</style>
