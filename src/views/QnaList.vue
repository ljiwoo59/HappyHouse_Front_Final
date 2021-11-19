<template>
  <div>
    <input type="text" v-model="word" @keyup.enter="search"/>&nbsp;
    <button @click="search">검색</button>
    <br />
    <hr />
    <section>
      <transition-group name="list" tag="ul">

        <b-table-simple hover responsive key="t">
            <thead  head-variant="dark">
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>글쓴이</th>
                    <th>작성일</th>
                </tr>
            </thead>
            <tbody v-for="qna in Qnas" :key="qna.num" class="shadow">
                <tr>
                    <td>{{ qna.num }}</td>
                    <td><router-link :to="`/detail/${qna.num}`">{{ qna.title }}</router-link></td>
                    <td>{{qna.id}}</td>
                    <td>{{qna.wdate}}</td>
                </tr>
            </tbody>
        </b-table-simple>
      </transition-group>
    </section>
    <section>
      <!-- <TodoFooter></TodoFooter> -->
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

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
