<template>
  <div class="container">
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
					<th>내용</th>
					<td class="txt_cont" v-html="Qna.content"></td>
				</tr>
			</table>
    </div>

    <div class="btnWrap">
      <span class="addContainer" @click="back"><p class="btnAdd btn" aria-hidden="true">돌아가기</p></span>&nbsp;&nbsp;
      <span class="addContainer" @click="mod"><p class="btnAdd btn" aria-hidden="true">수정하기</p></span>&nbsp;&nbsp;
      <span class="addContainer" @click="rp"><p class="btnAdd btn" aria-hidden="true">답글달기</p></span>&nbsp;&nbsp;
		</div>	
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  created() {
    this.$store.dispatch("DETAILQNA", this.$route.params.num);
  },

  computed: {
    ...mapState(["Qna"])
  },

  methods: {
    back() {
      this.$router.push("/");
    },
    rp() {
      this.$router.push("/reply");
    },
    mod() {
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
.btnWrap{text-align:center; margin:20px 0 0 0;}
.btnWrap a{margin:0 10px;}
</style>
