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
              <h1 slot="title" class="card-title">Sign Up</h1>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-facebook-square"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-twitter"></i>
              </md-button>
              <md-button
                slot="buttons"
                href="javascript:void(0)"
                class="md-just-icon md-simple md-white"
              >
                <i class="fab fa-google-plus-g"></i>
              </md-button>
              <p slot="description" class="description">Or Be Classical</p>

              <md-field class="md-form-group" slot="inputs">
                <md-icon>face</md-icon>
                <label>UserID</label>
                <md-input v-model="user.id"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password</label>
                <md-input v-model="user.password" type="password"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>person</md-icon>
                <label>Your Name</label>
                <md-input v-model="user.name"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Your Address</label>
                <md-input v-model="user.address"></md-input>
              </md-field>
              <md-button slot="footer" class="md-simple md-success md-lg" @click="confirm">
                Get Started
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
    <div id="notifications" v-if="!registStatus">
      <div class="alert alert-danger">
        <div class="container">
          <button
            type="button"
            aria-hidden="true"
            class="close"
            @click="(event) => removeNotify(event, 'alert-danger')"
          >
            <md-icon>clear</md-icon>
          </button>
          <div class="alert-icon">
            <md-icon>info_outline</md-icon>
          </div>
          <b> ERROR ALERT </b> : 중복된 아이디 입니다!
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
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
  methods: {
    ...mapActions(memberStore, ["DELETEONE"]),
    async deleteone() {
      await this.DELETEONE(this.userInfo.id);

      this.$router.push("/");
    },
    movePage() {
      this.$router.push({ name: "Update" });
    },
  },
};
</script>

<style></style>
