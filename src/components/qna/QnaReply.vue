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

          <div class="AddWrap">
            <b-table-simple
              class="tbAdd"
              style="margin-top: 50px; font-size: 12px; font-family: 'IBMPlexSansKR-Regular'"
            >
              <colgroup>
                <col width="15%" />
                <col width="*" />
              </colgroup>
              <tr style="font-size: 15px">
                <th>제목</th>
                <td style="font-weight: bold">{{ Qna.title }}</td>
              </tr>
              <tr>
                <th>작성자</th>
                <td>{{ Qna.id }}</td>
              </tr>
              <tr>
                <th>내용</th>
                <td class="txt_cont" v-html="Qna.content"></td>
              </tr>
            </b-table-simple>
          </div>

          <div
            class="container"
            style="margin-top: 50px; font-size: 12px; font-family: 'IBMPlexSansKR-Regular'"
          >
            <md-field>
              <label style="color:darkolivegreen">답글</label>
              <md-textarea v-model="reply"></md-textarea>
            </md-field>
          </div>

          <div class="btnWrap">
            <span class="clearAllBtn" @click="setReply"
              ><md-button class="md-default">완료</md-button></span
            >&nbsp;&nbsp;
            <span class="clearAllBtn" @click="back"
              ><md-button class="md-default">돌아가기</md-button></span
            >&nbsp;&nbsp;
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
    return {
      reply: "",
    };
  },
  methods: {
    setReply() {
      if (this.reply == "") alert("입력해주세요");
      else {
        this.$store.commit("SETREPLY", this.reply);
        this.$store.dispatch("MODIFY", this.$store.state.Qna);
        this.$router.push("/detail/" + this.Qna.num);
      }
    },
    back() {
      this.$router.push("/detail/" + this.Qna.num);
    },
  },
};
</script>

<style>
.tbAdd td textarea {
  width: 100%;
  min-height: 300px;
  padding: 10px;
  box-sizing: border-box;
}
</style>
