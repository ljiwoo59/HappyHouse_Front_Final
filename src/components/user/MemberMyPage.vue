<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="
              md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40
              mx-auto
            "
          >
            <login-card header-color="green">
              <h1 slot="title" class="card-title">My Page</h1>
              <div class="avatar" slot="inputs">
                <img :src="img" alt="Circle Image" class="img-raised rounded-circle img-fluid" />
                <br><br>
              </div>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>UserID</label>
                <md-input v-model="userInfo.id" readonly="readonly"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>person</md-icon>
                <label>Your Name</label>
                <md-input v-model="user.name" :placeholder="userInfo.name"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Your Address</label>
                <md-input v-model="user.address" :placeholder="userInfo.address"></md-input>
              </md-field>
              <md-button slot="footer" class="md-simple md-success md-lg" @click="update">
                Edit
              </md-button>
              <md-button slot="footer" class="md-simple md-success md-lg" @click="deleteone">
                Disable Account
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { LoginCard } from "@/components";

const memberStore = "memberStore";

export default {
  name: "MemberMyPage",
  components: { LoginCard },
  props: {
    header: {
      type: String,
      default: require("@/assets/images/city-profile.jpg"),
    },
    img: {
      type: String,
      default: require("@/assets/images/avatar.jpg"),
    },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
  data() {
    return {
      user: {
        name: "",
        address: "",
      },
    }
  },
  methods: {
    ...mapActions(memberStore, ["DELETEONE"]),
    ...mapActions(memberStore, ["UPDATE"]),
    async update() {
      this.user.id = this.userInfo.id;
      if (this.user.name == "") this.user.name = this.userInfo.name;
      if (this.user.address == "") this.user.address = this.userInfo.address;
      await this.UPDATE(this.user);

      // this.movePage();
    },
    async deleteone() {
      await this.DELETEONE(this.userInfo.id);

      this.$router.push("/");
    },
    movePage() {
      this.$router.go(this.$router.currentRoute);
    },
  },
};
</script>

<style></style>
