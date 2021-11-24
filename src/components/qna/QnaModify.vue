<template>
  <div>
    <parallax class="section page-header header-filter" :style="headerStyle" style="height:300px">
      <div class="container">
        <div class="md-layout">
          <!-- <div class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100">
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
          </div> -->
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

          <div
            class="container"
            style="margin-top: 50px; font-size: 12px; font-family: 'IBMPlexSansKR-Regular'"
          >
            <md-field>
              <label>제목</label>
              <md-input v-model="Qna.title"></md-input>
            </md-field>
            <md-field>
              <label>내용</label>
              <md-textarea style="height:500px" v-model="Qna.content"></md-textarea>
            </md-field>
          </div>

          <div class="btnWrap">
            <span class="clearAllBtn" @click="mod"
              ><md-button class="md-default">완료</md-button></span
            >
            &nbsp; &nbsp;
            <span class="clearAllBtn" @click="back"
              ><md-button class="md-default">뒤로</md-button></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    header: {
      type: String,
      default: require("@/assets/images/hero_bg_4.jpg"),
    },
  },
  computed: {
    ...mapState(["Qna"]),
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.push("/detail/" + this.Qna.num);
    },
    rp() {
      this.$router.push("/reply");
    },
    mod() {
      if (this.Qna.title == "") alert("입력해 주세요");
      else if (this.Qna.content == "") alert("입력해 주세요");
      else {
        this.$store.dispatch("MODIFY", {
          num: this.Qna.num,
          title: this.Qna.title,
          content: this.Qna.content,
          reply: this.Qna.reply,
        });
        this.$router.push("/detail/" + this.Qna.num);
      }
    },
  },
};
</script>

<style></style>
