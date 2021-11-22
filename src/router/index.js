import Vue from "vue";
import VueRouter from "vue-router";

import Main from "@/views/main/Main.vue";

import MemberLogin from "@/components/user/MemberLogin.vue";
import MemberJoin from "@/components/user/MemberJoin.vue";
import MemberMyPage from "@/components/user/MemberMyPage.vue";
import MemberUpdate from "@/components/user/MemberUpdate.vue";

import QnaInput from "@/components/qna/QnaInput.vue";
import QnaList from "@/components/qna/QnaList.vue";
import QnaReply from "@/components/qna/QnaReply.vue";
import QnaDetail from "@/components/qna/QnaDetail.vue";
import QnaModify from "@/components/qna/QnaModify.vue";

import store from "@/store/index.js";

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
    component: Main
  },

  {
    path: "/user/siginin",
    name: "SignIn",
    component: MemberLogin,
  },
  {
    path: "/user/signup",
    name: "SignUp",
    component: MemberJoin,
  },
  {
    path: "/user/mypage",
    name: "MyPage",
    beforeEnter: onlyAuthUser,
    component: MemberMyPage,
  },
  {
    path: "/user/update",
    name: "Update",
    beforeEnter: onlyAuthUser,
    component: MemberUpdate,
  },



  {
    path: "/list",
    name: "QnaList",
    component: QnaList,
  },
  {
    path: "/input",
    name: "QnaInput",
    component: QnaInput,
  },
  {
    path: "/reply",
    name: "QnaReply",
    component: QnaReply,
  },
  {
    path: "/detail/:num",
    name: "QnaDetail",
    component: QnaDetail,
  },
  {
    path: "/modify/",
    name: "QnaModify",
    component: QnaModify,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
