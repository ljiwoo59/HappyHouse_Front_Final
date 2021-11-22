<template>
  <div>
    <section id="index_section">
      <div class="card col-sm-12 mt-1" style="min-height: 850px">
        <!-- <div class="card-body"> -->
        <b-row class="mt-4 mb-4 text-center">
          <b-col class="sm-3">
            <b-form-select v-model="sidoCode" :options="sidos" @change="gugunList"></b-form-select>
          </b-col>
          <b-col class="sm-3">
            <b-form-select v-model="gugunCode" :options="guguns" @change="dongList"></b-form-select>
          </b-col>
          <b-col class="sm-3">
            <b-form-select v-model="dongCode" :options="dongs" @change="searchApt"></b-form-select>
          </b-col>
          <b-col class="sm-3">
            <b-form-input
              v-model="aptName"
              placeholder="아파트 검색"
              @keyup.enter="search"
            ></b-form-input>
          </b-col>
          <b-button variant="outline-info" @click="search">검색</b-button>
          <b-col class="sm-3">
            <word/>
          </b-col>
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
              v-b-toggle.sidebar-1
              :items="houses"
              :fields="fields"
              :per-page="perPage"
              :current-page="currentPage"
              @row-clicked="clickHouse"
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
              v-b-toggle.sidebar-1
              :items="houses2"
              :fields="fields2"
              :per-page="perPage"
              :current-page="currentPage"
              @row-clicked="clickHouse"
            ></b-table>

            <b-pagination
              v-model="currentPage"
              :total-rows="houses2.length"
              :per-page="perPage"
              aria-controls="house2table"
            ></b-pagination>
          </div>
        </div>

          
          <!-- <br>
          <b-row>
          <b-col>
            <word />
          </b-col>
          
          </b-row> -->

        <!-- </div> -->

        <b-sidebar
          id="sidebar-1"
          v-if="house != null && houses2.length == 0 && houses.length != 0"
          :title="this.house.아파트"
          shadow
        >
          <div class="px-3 py-2">
            <b-img :src="require('../../assets/Banpo.jpg')" fluid></b-img>
            <table class="tbAdd">
              <colgroup>
                <col width="15%" />
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
          id="sidebar-1"
          v-if="house != null && houses2.length != 0 && houses.length == 0"
          :title="this.house.aptName"
          shadow
        >
          <div class="px-3 py-2">
            <b-img :src="require('../../assets/Chundam.jpg')" fluid></b-img>
            <table class="tbAdd">
              <colgroup>
                <col width="15%" />
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
                <td>{{ this.house.sidoName }} {{this.house.gugunName}}</td>
              </tr>
              <tr>
                <th>지번</th>
                <td>{{ this.house.jibun }}</td>
              </tr>
            </table>
          </div>
        </b-sidebar>
      </div>
    </section>
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

<style></style>
