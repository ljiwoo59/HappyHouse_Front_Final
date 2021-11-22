<template>
  <b-container class="mt-4" v-if="userInfo">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show
          ><h3><b-icon icon="person-lines-fill"></b-icon> Member Service</h3></b-alert
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-jumbotron>
          <template #lead> 회원 정보 </template>

          <hr class="my-4" />

          <b-container class="mt-4">
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="4" align-self="end">아이디</b-col
              ><b-col cols="4" align-self="start"
                ><input type="text" :placeholder="userInfo.id" readonly="readonly"
              /></b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="4" align-self="end">이름</b-col
              ><b-col cols="4" align-self="start"
                ><input type="text" v-model="user.name" :placeholder="userInfo.name"
              /></b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="4" align-self="end">주소</b-col
              ><b-col cols="4" align-self="start"
                ><input type="text" v-model="user.address" :placeholder="userInfo.address"
              /></b-col>
              <b-col cols="2"></b-col>
            </b-row>
          </b-container>
          <hr class="my-4" />

          <b-button variant="primary" class="mr-1" @click="update">수정완료</b-button>
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberMyPage",
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  data() {
    return {
      user: {
        id: "",
        name: "",
        address: "",
      },
    };
  },
  methods: {
    ...mapActions(memberStore, ["UPDATE"]),
    async update() {
      this.user.id = this.userInfo.id;
      if (this.user.name == "") this.user.name = this.userInfo.name;
      if (this.user.address == "") this.user.address = this.userInfo.address;
      await this.UPDATE(this.user);

      this.$router.push({ name: "MyPage" });
    },
  },
};
</script>

<style></style>
