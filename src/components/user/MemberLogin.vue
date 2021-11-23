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
              <h1 slot="title" class="card-title">Sign In</h1>
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
              <md-button slot="footer" class="md-simple md-success md-lg" @click="confirm">
                Sign In
              </md-button>
              <md-button slot="footer" class="md-simple md-success md-lg" @click="movePage">
                Sign Up
              </md-button>
            </login-card>
          </div>
        </div>
      </div>
    </div>
    <div id="notifications" v-if="isLoginError">
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
          <b> ERROR ALERT </b> : 아이디 또는 비밀번호를 확인해주세요!
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
  name: "MemberLogin",
  components: {
    LoginCard,
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/images/profile_city.jpg"),
    },
  },
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
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
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
    removeNotify(e, notifyClass) {
      var target = e.target;
      while (target.className.indexOf(notifyClass) === -1) {
        target = target.parentNode;
      }
      return target.parentNode.removeChild(target);
    },
  },
};
</script>

<style lang="css">

</style>
