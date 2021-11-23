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
              <h3 class="description" style="font-family: Verdana">What can we help you with?</h3>
            </div>
          </div>

          <div class="container" style="margin-top: 50px; font-size: 12px; font-family: 'IBMPlexSansKR-Regular'">
                <md-field>
                  <label>제목</label>
                  <md-input v-model="Qna.title"></md-input>
                </md-field>
                <md-field>
                  <label>내용</label>
                  <md-textarea v-model="Qna.content"></md-textarea>
                </md-field>
          </div>

          <div class="btnWrap">
            <span class="addContainer" @click="addQna">
              <md-button class="md-default">등록</md-button> </span
            >&nbsp;&nbsp;
            <span class="addContainer" @click="back">
              <md-button class="md-default">뒤로</md-button>
            </span>
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
      Qna: {
        id: "",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
  methods: {
    addQna() {
      // action call
      if (this.Qna.title != "" && this.Qna.content != "") {
        this.Qna.id = this.userInfo.name;
        this.$store.dispatch("ADDQNA", this.Qna);
        this.Qna.id = "";
        this.Qna.title = "";
        this.Qna.content = "";
        this.$router.push("/list");
      } else {
        alert("입력해주세요.");
      }
    },
    back() {
      this.$router.push("/list");
    },
  },
};
</script>

<style></style>
