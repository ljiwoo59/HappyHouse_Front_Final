<template>
  <b-container class="container">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show
          ><h3><b-icon icon="person-lines-fill"></b-icon> Member Service</h3></b-alert
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="5">
        <b-card class="text-center mt-3" style="max-width: 40rem">
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isLoginError"
              >아이디 또는 비밀번호를 확인하세요.</b-alert
            >
            <b-form-group label="아이디:" label-for="userid">
              <b-form-input
                id="userid"
                v-model="user.id"
                required
                placeholder="아이디"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호:" label-for="userpwd">
              <b-form-input
                type="password"
                id="userpwd"
                v-model="user.password"
                required
                placeholder="비밀번호"
              ></b-form-input>
            </b-form-group>
            <b-button type="button" variant="primary" class="m-1" @click="confirm">로그인</b-button>
            <b-button type="button" variant="success" class="m-1" @click="movePage"
              >회원가입</b-button
            >
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberLogin",
  data() {
    return {
      user: {
        id: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(memberStore, ["LOGIN"]),
    async confirm() {
      if (this.user.id == null) alert("아이디를 입력해주세요.");
      else if (this.user.password == null) alert("비밀번호를 입력해주세요.");
      else {
        await this.LOGIN(this.user);

        if (this.isLogin) {
          this.$router.push("/");
        }
      }
    },
    movePage() {
      this.$router.push({ name: "SignUp" });
    },
  },
};
</script>

<style></style>
