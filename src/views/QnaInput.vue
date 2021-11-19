<template>
    <div class="container">
		<h1>QnA 등록</h1>

		<div class="AddWrap">
			<b-table-simple class="tbAdd">
				<colgroup>
					<col width="15%" />
					<col width="*" />
				</colgroup>
                <tr>
					<th>작성자</th>
					<td><input type="text" v-model="Qna.id"/></td>
				</tr>
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
            </span>
		</div>

	</div>
</template>

<script>
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
    methods: {
        addQna() {
            // action call
            if (this.Qna.id != "" && this.Qna.title != "" && this.Qna.content != "") {
                this.$store.dispatch("ADDQNA", this.Qna);
                console.log(this.Qna.id);
                this.Qna.id = "";
                this.Qna.title = "";
                this.Qna.content = "";
                this.$router.push("/");
            } else {
                alert("입력해주세요.")
            }
        }
    },
}
</script>

<style>
</style>