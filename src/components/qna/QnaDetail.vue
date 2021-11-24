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
              <h3 class="description" style="font-family:Verdana">What can we help you with?</h3>
            </div>
          </div>

          <div class="AddWrap">
            <b-table-simple class="tbAdd" style="margin-top:50px; font-size: 12px; font-family: 'IBMPlexSansKR-Regular'">
              <colgroup>
                <col width="15%" />
                <col width="*" />
              </colgroup>
              <tr style="font-size:15px;">
                <th>제목</th>
                <td style="font-weight:bold">{{ Qna.title }}</td>
              </tr>
              <tr>
                <th>작성자</th>
                <td>{{ Qna.id }}</td>
              </tr>
              <tr>
                <th>내용</th>
                <td class="txt_cont" v-html="Qna.content"></td>
              </tr>
              <tr style="font-size:14px;">
                <th style="color:darkolivegreen">답변</th>
                <td class="txt_rep" v-html="Qna.reply" style="color:darkolivegreen"></td>
              </tr>
            </b-table-simple>
          </div>

          <div class="btnWrap">
            <span class="addContainer" @click="back"
              ><md-button class="md-default">뒤로</md-button></span
            >&nbsp;&nbsp;
            <span class="addContainer" @click="mod"
              ><md-button class="md-default">수정</md-button></span
            >&nbsp;&nbsp;
            <span class="addContainer" @click="del"
              ><md-button class="md-default">삭제</md-button></span
            >&nbsp;&nbsp;
            <span class="addContainer" @click="rp"
              ><md-button class="md-default">답글</md-button></span
            >&nbsp;&nbsp;
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  props: {
    header: {
      type: String,
      default: require("@/assets/images/hero_bg_4.jpg"),
    },
  },

  created() {
    this.$store.dispatch("DETAILQNA", this.$route.params.num);
  },

  computed: {
    ...mapState(["Qna"]),
    ...mapState(memberStore, ["userInfo"]),
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },

  methods: {
    back() {
      this.$router.push("/list");
    },
    rp() {
      if (this.userInfo == null) alert("로그인 후 이용해주세요.");
      else if (this.Qna.reply == "답변이 없습니다.") this.$router.push("/reply");
      else alert("완료된 문의입니다.");
    },
    mod() {
      if (this.userInfo == null) alert("로그인 후 이용해주세요.");
      else if (this.Qna.reply != "답변이 없습니다.") alert("완료된 문의는 수정할 수 없습니다.");
      else if (this.Qna.id != this.userInfo.name) alert("작성자만 수정할 수 있습니다.");
      else this.$router.push("/modify");
    },
    del() {
      if (this.userInfo == null) alert("로그인 후 이용해주세요.");
      else if (this.userInfo.name != this.Qna.id) alert("작성자만 삭제할 수 있습니다.");
      else {
        this.$store.dispatch("DELETEQNA", this.Qna.num);
        this.$router.push("/list");
      }
    },
  },
};
</script>

<style>
.tbAdd {
  border-top: 1px solid #888;
}
.tbAdd th,
.tbAdd td {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}
.tbAdd td {
  padding: 10px 10px;
  box-sizing: border-box;
  text-align: left;
}
.tbAdd td.txt_cont {
  height: 300px;
  vertical-align: top;
}
.tbAdd td.txt_rep {
  height: 100px;
  vertical-align: top;
}
.btnWrap {
  text-align: center;
  margin: 20px 0 0 0;
}
.btnWrap a {
  margin: 0 10px;
}
</style>
