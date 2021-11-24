<template>
  <md-toolbar
    id="toolbar"
    md-elevation="0"
    class="md-transparent md-absolute"
    :class="extraNavClasses"
    :color-on-scroll="colorOnScroll"
  >
    <div class="md-toolbar-row md-collapse-lateral">
      <div class="md-toolbar-section-start">
        <router-link :to="{ name: 'Main' }" class="link" >
          <h1 class="md-title" style="font-weight:bold; font-size:20px; font-family:'Lucida Console', 'Courier New', monospace">HappyHouse</h1>
        </router-link>
      </div>
      <div class="md-toolbar-section-end">
        <div class="md-collapse">
          <div class="md-collapse-wrapper">
            <md-list>
              <md-list-item>
                <router-link :to="{ name: 'NewsList' }" class="link"
                  style="font-size:14px; font-family:Verdana">
                  News</router-link
                >
              </md-list-item>

              <md-list-item>
                <router-link :to="{ name: 'QnaList' }" class="link"
                  style="font-size:14px; font-family:Verdana">
                  Help</router-link
                >
              </md-list-item>

              <md-list-item target="_blank" v-if="this.isLogin">
                <router-link :to="{ name: 'MyPage'}" style="font-size:14px; font-family:Verdana">
                Welcome, {{ userInfo.name }} ({{userInfo.id}})
                </router-link>
              </md-list-item>

              <md-list-item v-if="this.isLogin" @click.prevent="onClickLogout"> 
                <router-link to="/" style="font-size:14px; font-family:Verdana">
                SignOut
                </router-link>
              </md-list-item>

              <md-list-item v-if="!this.isLogin">
                <router-link :to="{ name: 'SignIn' }" class="link2"
                  style="font-size:14px; font-family:Verdana"> Sign In</router-link
                >
              </md-list-item>
            </md-list>
          </div>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}

import { mapState, mapMutations } from "vuex";
const memberStore = "memberStore";

export default {
  components: {},
  props: {
    type: {
      type: String,
      default: "white",
      validator(value) {
        return ["white", "default", "primary", "danger", "success", "warning", "info"].includes(
          value
        );
      },
    },
    colorOnScroll: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      extraNavClasses: "",
      toggledClass: false,
    };
  },
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
    bodyClick() {
      let bodyClick = document.getElementById("bodyClick");

      if (bodyClick === null) {
        let body = document.querySelector("body");
        let elem = document.createElement("div");
        elem.setAttribute("id", "bodyClick");
        body.appendChild(elem);

        let bodyClick = document.getElementById("bodyClick");
        bodyClick.addEventListener("click", this.toggleNavbarMobile);
      } else {
        bodyClick.remove();
      }
    },
    toggleNavbarMobile() {
      this.NavbarStore.showNavbar = !this.NavbarStore.showNavbar;
      this.toggledClass = !this.toggledClass;
      this.bodyClick();
    },
    handleScroll() {
      let scrollValue = document.body.scrollTop || document.documentElement.scrollTop;
      let navbarColor = document.getElementById("toolbar");
      this.currentScrollValue = scrollValue;
      if (this.colorOnScroll > 0 && scrollValue > this.colorOnScroll) {
        this.extraNavClasses = `md-${this.type}`;
        navbarColor.classList.remove("md-transparent");
      } else {
        if (this.extraNavClasses) {
          this.extraNavClasses = "";
          navbarColor.classList.add("md-transparent");
        }
      }
    },
    scrollListener() {
      resizeThrottler(this.handleScroll);
    },
    scrollToElement() {
      let element_id = document.getElementById("downloadSection");
      if (element_id) {
        element_id.scrollIntoView({ block: "end", behavior: "smooth" });
      }
    },
  },
  mounted() {
    document.addEventListener("scroll", this.scrollListener);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollListener);
  },
};
</script>
