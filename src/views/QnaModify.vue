<template>
  <div>
    <!-- <table>
      <tr>
        <th>번호</th>
        <td >{{Qna.num}}</td>
      </tr>
      <tr>
        <th>작성자</th>
        <td >{{Qna.id}}</td>
      </tr>
      <tr>
        <th>제목</th>
        <input type="text" v-model="New.title" :placeholder="Qna.title">
      </tr>
      <tr>
        <th>작성일</th>
        <td >{{Qna.wdate}}</td>
      </tr>
      <tr>
        <th>내용</th>
        <input type="text" v-model="New.content" :placeholder="Qna.content">
      </tr>
      <tr>
        <th>답글</th>
        <td >{{Qna.reply}}</td>
      </tr>
    </table> -->

    <div class="AddWrap">
			<!-- <form> -->
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
			<!-- </form> -->
		</div>

    <div class="btnWrap">
			<!-- <a href="javascript:;" @click="fnList" class="btn">목록</a> -->
      <!-- <span class="addContainer" @click="back"><p class="btnAdd btn" aria-hidden="true">돌아가기</p></span>&nbsp;&nbsp;
      <span class="addContainer" @click="mod"><p class="btnAdd btn" aria-hidden="true">수정하기</p></span>&nbsp;&nbsp;
      <span class="addContainer" @click="rp"><p class="btnAdd btn" aria-hidden="true">답글달기</p></span>&nbsp;&nbsp; -->
      <span class="clearAllBtn" @click="back"><p class="btnAdd btn" aria-hidden="true">돌아가기</p></span>
    <span class="clearAllBtn" @click="mod"><p class="btnAdd btn" aria-hidden="true">완료</p></span>
		</div>	

    <!-- <span class="clearAllBtn" @click="back">돌아가기</span>
    <span class="clearAllBtn" @click="mod">완료</span> -->
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
            this.$router.push("/");
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
.tbAdd{border-top:1px solid #888;}
	.tbAdd th, .tbAdd td{border-bottom:1px solid #eee; padding:5px 0;}
	.tbAdd td{padding:10px 10px; box-sizing:border-box;}
	.tbAdd td input{width:100%; min-height:30px; box-sizing:border-box; padding:0 10px;}
	.tbAdd td textarea{width:100%; min-height:300px; padding:10px; box-sizing:border-box;}
	.btnWrap{text-align:center; margin:20px 0 0 0;}
	.btnWrap span{margin:0 10px;}
	.btnAdd {background:#43b984}
</style>
