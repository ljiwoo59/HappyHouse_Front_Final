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
            QnA 수정
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
              <h1 class="title text-center">QnA 수정</h1>
              <h3 class="description">Search your interest!</h3>
            </div>
          </div>

          <div class="AddWrap">
            <b-table-simple class="tbAdd">
              <colgroup>
                <col width="15%" />
                <col width="*" />
              </colgroup>
              <tr>
                <th>제목</th>
                <td><input type="text" style="width:100%" v-model="New.title" :placeholder="Qna.title"></td>
              </tr>
              <tr>
                <th>내용</th>
                <td><textarea type="text" v-model="New.content" :placeholder="Qna.content"></textarea></td>
              </tr>
            </b-table-simple>
          </div>

          <div class="btnWrap">
            <span class="clearAllBtn" @click="mod"><md-button class="md-default">완료</md-button></span> &nbsp; &nbsp;
            <span class="clearAllBtn" @click="back"><md-button class="md-default">돌아가기</md-button></span>
          </div>	
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  props: {
    header: {
      type: String,
      default: require("@/assets/images/hero_bg_1.jpg"),
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
      New : {
        title: "",
        content: ""
      }
    }
  },
  methods: {
    back() {
      this.$router.push("/list");
    },
    rp() {
      this.$router.push("/reply");
    },
    mod() {
      if (this.New.title == "") this.New.title = this.Qna.title;
      if (this.New.content == "") this.New.content = this.Qna.content;
      this.$store.dispatch("MODIFY", {
        num: this.Qna.num,
        title: this.New.title,
        content: this.New.content,
        reply: this.Qna.reply
      });
      this.$router.push("/detail/this.Qna.num");
    },
  }
}
</script>

<style>
</style>
