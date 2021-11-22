<template>
  <div class="container">
    <br />
    <hr />

    <section>
      <b-table id="newstable"
              head-variant="light"
              :items="NewsList"
              :fields="fields"
              :per-page="perPage"
              :current-page="currentPage"
              responsive="sm">
        <template #cell(제목)="data">
          <a :href="`${data.item.url}`" target="_blank">{{ data.item.title }}</a>
        </template>
        <template #cell(내용)="data">
          {{ data.item.contents }}
        </template>
        <template #cell(시간)="data">
          <b-icon icon="clock" font-scale="1" variant="dark"></b-icon> {{ data.item.time }}
        </template>
      </b-table>
      <b-pagination
              v-model="currentPage"
              :total-rows="NewsList.length"
              :per-page="perPage"
              aria-controls="newstable"
            ></b-pagination>
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      fields: ['제목', '내용', '시간'],
      currentPage: 1,
      perPage: 15,
    };
  },
  created() {
    this.$store.dispatch("ALLNEWS");
  },
  computed: {
    ...mapState(["NewsList"]),
  },
  methods: {
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
