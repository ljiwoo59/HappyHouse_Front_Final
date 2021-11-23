import Vue from "vue";
import VueRouter from "vue-router";

import Main from "@/views/main/Main.vue";

import houseDetail from "@/components/houseDetail/houseDetail.vue";

import MemberLogin from "@/components/user/MemberLogin.vue";
import MemberJoin from "@/components/user/MemberJoin.vue";
import MemberMyPage from "@/components/user/MemberMyPage.vue";
import MemberUpdate from "@/components/user/MemberUpdate.vue";

import QnaInput from "@/components/qna/QnaInput.vue";
import QnaList from "@/components/qna/QnaList.vue";
import QnaReply from "@/components/qna/QnaReply.vue";
import QnaDetail from "@/components/qna/QnaDetail.vue";
import QnaModify from "@/components/qna/QnaModify.vue";

import NewsList from "@/views/news/NewsList.vue";

import store from "@/store/index.js";

import MainNavbar from "@/components/MainNavbar.vue";

Vue.use(VueRouter);

const onlyAuthUser = async (to, from, next) => {
  // console.log(store);
  const checkUserInfo = store.getters["memberStore/checkUserInfo"];
  const getUserInfo = store._actions["memberStore/getUserInfo"];
  let token = sessionStorage.getItem("access-token");
  if (checkUserInfo == null && token) {
    await getUserInfo(token);
  }
  if (checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "SignIn" });
    router.push({ name: "SignIn" });
  } else {
    console.log("로그인 했다.");
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Main",
    components: {default: Main, header: MainNavbar},
    props: {
      header: {colorOnScroll: 400}
    }
  },

  {
    path: "/house",
    name: "houseDetail",
    component: houseDetail
  },

  {
    path: "/user/siginin",
    name: "SignIn",
    components: {default: MemberLogin, header:MainNavbar},
    props: {
      header: {colorOnScroll: 400}
    }
  },
  {
    path: "/user/signup",
    name: "SignUp",
    components: {default: MemberJoin, header:MainNavbar},
    props: {
      header: {colorOnScroll: 400}
    }
  },
  {
    path: "/user/mypage",
    name: "MyPage",
    components: {defualt: MemberMyPage, header:MainNavbar},
    props: {
      header: {colorOnScroll: 400}
    }
  },
  {
    path: "/user/update",
    name: "Update",
    components: {default: MemberUpdate, header:MainNavbar},
    props: {
      header: {colorOnScroll: 400}
    }
  },

  {
    path: "/list",
    name: "QnaList",
    components: {default: QnaList, header:MainNavbar},
    props: {
      header: {colorOnScroll: 400}
    }
  },
  {
    path: "/input",
    name: "QnaInput",
    components: {default: QnaInput, header:MainNavbar},
    props: {
      header: {colorOnScroll: 400}
    }
  },
  {
    path: "/reply",
    name: "QnaReply",
    components: {default: QnaReply, header:MainNavbar},
    props: {
      header: {colorOnScroll: 400}
    }
  },
  {
    path: "/detail/:num",
    name: "QnaDetail",
    components: {default: QnaDetail, header:MainNavbar},
    props: {
      header: {colorOnScroll: 400}
    }
  },
  {
    path: "/modify/",
    name: "QnaModify",
    components: {default: QnaModify, header:MainNavbar},
    props: {
      header: {colorOnScroll: 400}
    }
  },
  {
    path: "/news",
    name: "NewsList",
    components: {default: NewsList, header:MainNavbar},
    props: {
      header: {colorOnScroll: 400}
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
