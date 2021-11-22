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
					<td><input type="text" v-model="New.title" :placeholder="Qna.title"></td>
				</tr>
				<tr>
					<th>내용</th>
					<td><textarea type="text" v-model="New.content" :placeholder="Qna.content"></textarea></td>
				</tr>
			</table>
    </div>

    <div class="btnWrap">
      <span class="clearAllBtn" @click="mod"><p class="btnAdd btn" aria-hidden="true">완료</p></span> &nbsp; &nbsp;
      <span class="clearAllBtn" @click="back"><p class="btnAdd btn" aria-hidden="true">돌아가기</p></span>
    </div>	
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  computed: {
    ...mapState(["Qna"])
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
