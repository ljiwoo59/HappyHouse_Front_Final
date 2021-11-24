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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { LoginCard } from "@/components";

const memberStore = "memberStore";

export default {
  name: "MemberJoin",
  components: {
    LoginCard,
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/images/profile_city.jpg"),
    },
  },
  computed: {
    ...mapState(memberStore, ["registStatus"]),
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
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

        if (this.registStatus == true) this.movePage();
        else {
          alert("중복된 아이디 입니다.");
        }
      }
    },
    movePage() {
      this.$router.push({ name: "SignIn" });
    },
  },
};
</script>

<style></style>
