<template>
  <div>
    <header id="index_header">
      <!-- 1. carousel -->
      <!-- <div id="cdemo" class="carousel slide" data-ride="carousel"> -->
        <!-- Indicators -->
        <!-- <ul class="carousel-indicators">
          <li data-target="#cdemo" data-slide-to="0" class="active"></li>
          <li data-target="#cdemo" data-slide-to="1"></li>
          <li data-target="#cdemo" data-slide-to="2"></li>
        </ul> -->

        <!-- The slideshow -->
        <!-- <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="../assets/Daegu.jpg" alt="Banpo" width="1200" height="300" />
            <div class="carousel-caption">
              <h1>HappyHouse</h1>
            </div>
          </div>
          <div class="carousel-item">
            <img src="../assets/Banpo.jpg" alt="Daegu" width="1200" height="300" />
            <div class="carousel-caption">
              <h1>HappyHouse</h1>
            </div>
          </div>
          <div class="carousel-item">
            <img src="../assets/Chundam.jpg" alt="Chungdam" width="1200" height="300" />
            <div class="carousel-caption">
              <h1>HappyHouse</h1>
            </div>
          </div>
        </div> -->

        <!-- Left and right controls -->
        <!-- <a class="carousel-control-prev" href="#cdemo" data-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="carousel-control-next" href="#cdemo" data-slide="next">
          <span class="carousel-control-next-icon"></span>
        </a> -->
      <!-- </div> -->

      <!-- nav start -->
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#"
              ><router-link :to="{ name: 'Main' }" class="link"
                ><b-icon icon="house" font-scale="1"></b-icon> HOME</router-link
              ></b-nav-item
            >
            <b-nav-item href="#"
              ><router-link :to="{ name: 'QnaList' }" class="link"
                ><b-icon icon="question-circle" font-scale="1" variant="light"></b-icon> QnA</router-link
              ></b-nav-item
            >
            <b-nav-item href="#"
              ><router-link :to="{ name: 'NewsList' }" class="link"
                ><b-icon icon="newspaper" font-scale="1" variant="light"></b-icon> News</router-link
            ></b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto" v-if="this.isLogin">
            <b-nav-item class="align-self-center"
              ><b-avatar
                variant="primary"
                v-text="userInfo ? userInfo.id.charAt(0).toUpperCase() : ''"
              ></b-avatar
              > {{ userInfo.name }} ({{ userInfo.id }})님 환영합니다.</b-nav-item
            >
            <b-nav-item class="align-self-center"
              ><router-link :to="{ name: 'MyPage' }" class="link align-self-center"
                >내 정보</router-link
              ></b-nav-item
            >
            <b-nav-item class="link align-self-center" @click.prevent="onClickLogout"
              >로그아웃</b-nav-item
            >
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto" v-else>
            <b-nav-item-dropdown right>
              <template #button-content>
                <b-icon icon="people" font-scale="2"></b-icon>
              </template>
              <b-dropdown-item href="#"
                ><router-link :to="{ name: 'SignUp' }" class="link2"
                  ><b-icon icon="person-circle"></b-icon> 회원가입</router-link
                ></b-dropdown-item
              >
              <b-dropdown-item href="#"
                ><router-link :to="{ name: 'SignIn' }" class="link2"
                  ><b-icon icon="key"></b-icon> 로그인</router-link
                ></b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

const memberStore = "memberStore";

export default {
  name: "NaviBar",
  computed: {
    ...mapState(memberStore, ["isLogin", "userInfo"]),
  },
  methods: {
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      this.SET_IS_LOGIN(false);
      this.SET_USER_INFO(null);
      // sessionStorage.removeItem("access-token");
      this.$router.go(this.$router.currentRoute);
    },
  },
};
</script>

<style>
.link {
  font-size: 12.5px;
  color: white;
}

.link2 {
  font-size: 12.5px;
  color: black;
}
</style>
