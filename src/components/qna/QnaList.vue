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
              <h1 class="title text-center">Customer Service</h1>
              <h3 class="description" style="font-family:Verdana">What can we help you with?</h3>
            </div>
          </div>
          
          <b-row class="mt-4 mb-4 text-center">
            <b-col></b-col>
            <b-col class="sm-3">
              <md-field>
                <md-icon>search</md-icon>
                <md-input v-model="word" style="font-family:Verdana" placeholder="Search" @keyup.enter="search"></md-input>
              </md-field>
              </b-col>
            <b-col class="sm-3">
              <md-button style="float:left" class="md-info"  @click="search">검색</md-button>
            </b-col>
          </b-row>
          <br />
          <br>

          <div>
            <section>
              <b-table 
              id="qnatable"
              head-variant="light"
              :fields="fields"
              :items="Qnas"
              :per-page="perPage"
              :current-page="currentPage"
              style="font-size: 12px; font-family: 'IBMPlexSansKR-Regular'"
              responsive="sm">

                <template #cell(번호)="data">
                  {{ data.item.num }}
                </template>
                <template #cell(제목)="data">
                  <router-link :to="`/detail/${data.item.num}`" style="color:darkolivegreen; font-weight:bold">{{ data.item.title }}</router-link>
                </template>
                <template #cell(글쓴이)="data">
                  {{ data.item.id }}
                </template>
                <template #cell(작성일)="data">
                  {{ data.item.wdate }}
                </template>
                <template #cell(완료)="data">
                  <md-icon v-if="data.item.reply != null && data.item.reply != '답변이 없습니다.'" style="color:cadetblue">check</md-icon>
                  <md-icon v-else></md-icon>
                </template>
              </b-table>
            </section>
            <div>
              <b-pagination
                        v-model="currentPage"
                        :total-rows="Qnas.length"
                        :per-page="perPage"
                        aria-controls="qnatable"
                      ></b-pagination>
            </div>
            <div class="btnWrap">
            <span class="addContainer" @click="all"
              ><md-button class="md-default">목록</md-button></span
            >&nbsp;&nbsp;
            <span class="addContainer" @click="write"
              ><md-button class="md-default">작성</md-button></span
            >&nbsp;&nbsp;
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  props: {
    header: {
      type: String,
      default: require("@/assets/images/hero_bg_1.jpg"),
    },
  },
  data() {
    return {
      word: "",
      fields: ['번호', '제목', '글쓴이', '작성일', '완료'],
      currentPage: 1,
      perPage: 10,
    };
  },
  created() {
    this.$store.dispatch("ALLQNA");
  },
  computed: {
    ...mapState(["Qnas"]),
    ...mapState(memberStore, ["userInfo"]),
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
  methods: {
    ...mapActions({
      removeQna: "DELETEQNA",
    }),
    search() {
      if (this.title != "") {
        this.$store.dispatch("SEARCH", this.word);
      } else {
        alert("검색어를 입력해 주세요");
      }
    },
    all() {
      this.word = "";
      this.$store.dispatch("ALLQNA");
    },
    write() {
      if (this.userInfo != null)
        this.$router.push("/input");
      else alert("로그인 후 이용해주세요.");
    }
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
