<template>
    <div class="container">
		<div class="AddWrap">
			<b-table-simple class="tbAdd">
				<colgroup>
					<col width="15%" />
					<col width="*" />
				</colgroup>
				<tr>
					<th>제목</th>
					<td><input type="text" v-model="Qna.title"/></td>
				</tr>
				<tr>
					<th>내용</th>
					<td><textarea v-model="Qna.content"></textarea></td>
				</tr>
			</b-table-simple>
            <!-- <span class="addContainer" @click="addQna">
                <i class="addBtn fas fa-plus" aria-hidden="true"></i>
            </span> -->
		</div>

        <div class="btnWrap">
            <span class="addContainer" @click="addQna">
                <p class="btnAdd btn" aria-hidden="true">등록</p>
            </span>&nbsp;&nbsp;
            <span class="addContainer" @click="back">
                <p class="btnAdd btn" aria-hidden="true">뒤로</p>
            </span>
		</div>

	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
    data() {
        return {
            Qna: {
                id: "",
                title: "",
                content: ""
            }
        }
    },
    computed: {
        ...mapState(memberStore, ["userInfo"]),
    },
    methods: {
        addQna() {
            // action call
            if (this.Qna.title != "" && this.Qna.content != "") {
                this.Qna.id = this.userInfo.name;
                this.$store.dispatch("ADDQNA", this.Qna);
                this.Qna.id = "";
                this.Qna.title = "";
                this.Qna.content = "";
                this.$router.push("/list");
            } else {
                alert("입력해주세요.")
            }
        },
        back() {
            this.$router.push("/list");
        }
    },
}
</script>

<style>
</style>