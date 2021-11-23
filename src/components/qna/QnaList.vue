<template>
  <div>
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100">
            <h1
              class="title"
              style="
                color: darkolivegreen;
                font-size: 65px;
                text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
              "
            >
              QnA
            </h1>
          </div>
        </div>
      </div>
    </parallax>

    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center">
              <h1 class="title text-center">QnA</h1>
              <h3 class="description">Search your interest!</h3>
            </div>
          </div>
          <!-- <input type="text" v-model="word" @keyup.enter="search" />&nbsp;
          <b-button variant="outline-info" @click="search">검색</b-button>
          <br />
          <hr /> -->
          <b-row class="mt-4 mb-4 text-center">
            <b-col></b-col>
            <b-col class="sm-3">
              <md-field>
                <md-input v-model="word" placeholder="Search" @keyup.enter="search"></md-input>
              </md-field>
              </b-col>
            <b-col class="sm-3">
              <md-button style="float:left" class="md-info"  @click="search">검색</md-button>
            </b-col>
          </b-row>
          <br />
          <br>

          <div>
            <section>
              <b-table 
              id="qnatable"
              head-variant="light"
              :fields="fields"
              :items="Qnas"
              :per-page="perPage"
              :current-page="currentPage"
              responsive="sm">
                <!-- <thead>
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
                </tbody> -->
                <template #cell(번호)="data">
                  {{ data.item.num }}
                </template>
                <template #cell(제목)="data">
                  <router-link :to="`/detail/${data.item.num}`">{{ data.item.title }}</router-link>
                </template>
                <template #cell(글쓴이)="data">
                  {{ data.item.id }}
                </template>
                <template #cell(작성일)="data">
                  {{ data.item.wdate }}
                </template>
              </b-table>
              <!-- <b-pagination
                      v-model="currentPage"
                      :total-rows="Qnas.length"
                      :per-page="perPage"
                      aria-controls="qnatable"
                    ></b-pagination> -->
            </section>
            <div>
              <b-pagination
                        v-model="currentPage"
                        :total-rows="Qnas.length"
                        :per-page="perPage"
                        aria-controls="qnatable"
                      ></b-pagination>
            </div>
            <div class="btnWrap">
            <span class="addContainer" @click="all"
              ><md-button class="md-default">목록</md-button></span
            >&nbsp;&nbsp;
            <span class="addContainer" @click="write"
              ><md-button class="md-default">글쓰기</md-button></span
            >&nbsp;&nbsp;
          </div>
          </div>
          
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  props: {
    header: {
      type: String,
      default: require("@/assets/images/hero_bg_1.jpg"),
    },
  },
  data() {
    return {
      word: "",
      fields: ['번호', '제목', '글쓴이', '작성일'],
      currentPage: 1,
      perPage: 15,
    };
  },
  created() {
    this.$store.dispatch("ALLQNA");
  },
  computed: {
    ...mapState(["Qnas"]),
    ...mapState(memberStore, ["userInfo"]),
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
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
