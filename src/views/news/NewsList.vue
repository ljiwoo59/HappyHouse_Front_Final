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
                text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
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
              <h1 class="title text-center">News</h1>
              <h3 class="description">Search your interest!</h3>
            </div>
          </div>
         <b-row class="mt-4 mb-4 text-center">
           <b-col></b-col>
           <b-col>
              <md-field>
                <md-input v-model="word" placeholder="Search" @keyup.enter="searchN"></md-input>
              </md-field>
              <md-button class="md-info"  @click="searchN">검색</md-button>
           </b-col>
           <b-col>
           </b-col>
         </b-row>
          <br />
          <br>

          <section>
            <b-table
              id="newstable"
              head-variant="light"
              :items="NewsList"
              :fields="fields"
              :per-page="perPage"
              :current-page="currentPage"
              responsive="sm"
              style="font-size: 10.5px"
            >
              <template #cell(제목)="data">
                <a :href="`${data.item.url}`" target="_blank" style="color:darkgreen">{{ data.item.title }}</a>
              </template>
              <template #cell(내용)="data">
                {{ data.item.contents }}
              </template>
              <template #cell(시간)="data">
                <b-icon icon="clock" font-scale="1" variant="dark"></b-icon> {{ data.item.time }}
              </template>
            </b-table>
            <b-pagination
              v-model="currentPage"
              :total-rows="NewsList.length"
              :per-page="perPage"
              aria-controls="newstable"
            ></b-pagination>
          </section>

          <div class="btnWrap">
            <span class="addContainer" @click="all"
              ><md-button class="md-default"  @click="searchN">목록</md-button></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    header: {
      type: String,
      default: require("@/assets/images/hero_bg_1.jpg"),
    },
  },
  data() {
    return {
      fields: ["제목", "내용", "시간"],
      currentPage: 1,
      perPage: 15,
      word: "",
    };
  },
  created() {
    this.$store.dispatch("ALLNEWS");
  },
  computed: {
    ...mapState(["NewsList"]),
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
  methods: {
    searchN() {
      if (this.word == "") alert("검색어를 입력해주세요.");
      else this.$store.dispatch("SEARCHNEWS", this.word);
    },
    all() {
      this.word = "";
      this.$store.dispatch("ALLNEWS");
    },
  },
};
</script>

<style scoped>
.del {
  text-decoration: line-through;
}
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
