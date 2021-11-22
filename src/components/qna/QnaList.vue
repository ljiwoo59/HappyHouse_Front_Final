<template>
  <div class="container">
    <input type="text" v-model="word" @keyup.enter="search" />&nbsp;
    <b-button variant="outline-info" @click="search">검색</b-button>
    <br />
    <hr />
    <section>
      <b-table-simple>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody v-for="qna in Qnas" :key="qna.num">
          <tr>
            <td>{{ qna.num }}</td>
            <td>
              <router-link :to="`/detail/${qna.num}`">{{ qna.title }}</router-link>
            </td>
            <td>{{ qna.id }}</td>
            <td>{{ qna.wdate }}</td>
          </tr>
        </tbody>
      </b-table-simple>
    </section>
    <section>
      <div class="btnWrap">
        <span class="addContainer" @click="all"
          ><p class="btnAdd btn" aria-hidden="true">목록</p></span
        >&nbsp;&nbsp;
        <span class="addContainer" @click="write"
          ><p class="btnAdd btn" aria-hidden="true">글쓰기</p></span
        >&nbsp;&nbsp;
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  data() {
    return {
      word: "",
    };
  },
  created() {
    this.$store.dispatch("ALLQNA");
  },
  computed: {
    ...mapState(["Qnas"]),
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    ...mapActions({
      removeQna: "DELETEQNA",
    }),
    search() {
      if (this.title != "") {
        this.$store.dispatch("SEARCH", this.word);
      } else {
        alert("검색어를 입력해 주세요");
      }
    },
    all() {
      this.word = "";
      this.$store.dispatch("ALLQNA");
    },
    write() {
      if (this.userInfo != null)
        this.$router.push("/input");
      else alert("로그인 후 이용해주세요.");
    }
  },
};
</script>

<style scoped>
.del {
  text-decoration: line-through;
}
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
