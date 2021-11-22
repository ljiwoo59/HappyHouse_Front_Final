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
        <b-card class="text-left mt-3" style="max-width: 40rem">
          <b-form-group id="input-group-1" label="ID:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="user.id"
              type="text"
              placeholder="아이디 입력"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Name:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="user.name"
              placeholder="이름 입력"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Password:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="user.password"
              placeholder="비밀번호 입력"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-4" label="Address:" label-for="input-4">
            <b-form-input
              id="input-4"
              v-model="user.address"
              placeholder="주소 입력"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="button" variant="primary" class="m-1" @click="confirm">회원가입</b-button>
          <b-button type="button" variant="success" class="m-1" @click="movePage">로그인</b-button>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberJoin",
  data() {
    return {
      user: {
        id: null,
        password: null,
        name: null,
        address: null,
      },
    };
  },
  methods: {
    ...mapActions(memberStore, ["REGISTER"]),
    async confirm() {
      if (this.user.id == null) alert("아이디를 입력해주세요.");
      else if (this.user.password == null) alert("비밀번호를 입력해주세요.");
      else if (this.user.name == null) alert("이름을 입력해주세요.");
      else if (this.user.address == null) alert("주소를 입력해 주세요");
      else {
        await this.REGISTER(this.user);

        this.movePage();
      }
    },
    movePage() {
      this.$router.push({ name: "SignIn" });
    },
  },
};
</script>

<style></style>
