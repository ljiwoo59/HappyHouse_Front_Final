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
            QnA 답글
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
              <h1 class="title text-center">QnA 답글</h1>
              <h3 class="description">Search your interest!</h3>
            </div>
          </div>

          <div class="AddWrap">
            <b-table-simple class="tbAdd">
              <tr>
                <th>답글</th>
                <td><textarea type="text" v-model="reply"></textarea></td>
              </tr>
            </b-table-simple>
          </div>

          <div class="btnWrap">
            <span class="clearAllBtn" @click="setReply"><md-button class="md-default">완료</md-button></span>&nbsp;&nbsp;
            <span class="clearAllBtn" @click="back"><md-button class="md-default">돌아가기</md-button></span>&nbsp;&nbsp;
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
      reply: ""
    }
  },
  methods: {
    setReply() {
      if (this.reply == "") alert("입력해주세요");
      else {
        this.$store.commit("SETREPLY", this.reply);
        this.$store.dispatch("MODIFY", this.$store.state.Qna);
        this.$router.push("/detail/Qna.num");
      }
    },
    back() {
      this.$router.push("/list");
    },
  }
}
</script>

<style>
	.tbAdd td textarea{width:100%; min-height:300px; padding:10px; box-sizing:border-box;}
</style>
