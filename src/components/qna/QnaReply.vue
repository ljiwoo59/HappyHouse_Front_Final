<template>
  <div class="container">
    <div class="AddWrap">
			<table class="tbAdd">
				<tr>
					<th>답글</th>
					<td><textarea type="text" v-model="reply"></textarea></td>
				</tr>
			</table>
		</div>

    <div class="btnWrap">
      <span class="clearAllBtn" @click="setReply"><p class="btnAdd btn" aria-hidden="true">완료</p></span>&nbsp;&nbsp;
      <span class="clearAllBtn" @click="back"><p class="btnAdd btn" aria-hidden="true">돌아가기</p></span>&nbsp;&nbsp;
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
