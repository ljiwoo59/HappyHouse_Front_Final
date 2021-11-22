<template>
  <div class="container">
    <section>
    <div class="AddWrap">
      <table class="tbAdd">
				<colgroup>
					<col width="15%" />
					<col width="*" />
        </colgroup>
				<tr>
					<th>제목</th>
					<td>{{Qna.title}}</td>
				</tr>
        <tr>
					<th>작성자</th>
					<td>{{Qna.id}}</td>
				</tr>
				<tr>
					<th>내용</th>
					<td class="txt_cont" v-html="Qna.content"></td>
				</tr>
        <tr>
					<th>답변</th>
					<td class="txt_rep" v-html="Qna.reply"></td>
				</tr>
			</table>
    </div>

    <div class="btnWrap">
      <span class="addContainer" @click="back"><p class="btnAdd btn" aria-hidden="true">뒤로</p></span>&nbsp;&nbsp;
      <span class="addContainer" @click="mod"><p class="btnAdd btn" aria-hidden="true">수정하기</p></span>&nbsp;&nbsp;
      <span class="addContainer" @click="rp"><p class="btnAdd btn" aria-hidden="true">답글달기</p></span>&nbsp;&nbsp;
		</div>	
    </section>
  </div>
</template>

<script>
import {mapState} from "vuex";

const memberStore = "memberStore";

export default {
  created() {
    this.$store.dispatch("DETAILQNA", this.$route.params.num);
  },

  computed: {
    ...mapState(["Qna"]),
    ...mapState(memberStore, ["userInfo"])
  },

  methods: {
    back() {
      this.$router.push("/list");
    },
    rp() {
      if (this.userInfo == null) alert("로그인 후 이용해주세요.");
      else if (this.Qna.reply == "답변이 없습니다.")
        this.$router.push("/reply");
      else alert("완료된 문의입니다.")
    },
    mod() {
      if (this.userInfo == null) alert("로그인 후 이용해주세요.");
      else if (this.Qna.id != this.userInfo.name) alert("작성자만 수정할 수 있습니다.");
      else
        this.$router.push("/modify");
    },
  }
}
</script>

<style>
.tbAdd{border-top:1px solid #888;}
.tbAdd th, .tbAdd td{border-bottom:1px solid #eee; padding:5px 0; }
.tbAdd td{padding:10px 10px; box-sizing:border-box; text-align:left;}
.tbAdd td.txt_cont{height:300px; vertical-align:top;}
.tbAdd td.txt_rep{height:100px; vertical-align:top;}
.btnWrap{text-align:center; margin:20px 0 0 0;}
.btnWrap a{margin:0 10px;}
</style>
