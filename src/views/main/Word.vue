<template>
  <div>
    <b-table
      borderless
      hover
      :items="words"
      :fields="fields"
      head-variant="light"
      @row-clicked="clickApt"
    ></b-table>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

const wordStore = "wordStore";
const houseStore = "houseStore";
const memberStore = "memberStore";

export default {
  computed: {
    ...mapState(wordStore, ["words"]),
    ...mapState(memberStore, ["userInfo"]),
  },
  data() {
    return {
      fields: [
        {
          key: "word",
          label: "인기 검색어",
        },
      ],
    };
  },
  methods: {
    ...mapActions(houseStore, ["getHouseName"]),
    ...mapActions(wordStore, ["getWords"]),
    ...mapMutations(houseStore, [
      "CLEAR_HOUSE_LIST",
      "CLEAR_HOUSE2_LIST",
      "SET_DONG_NAME",
    ]),
    clickApt(word) {
      this.CLEAR_HOUSE_LIST();
      this.CLEAR_HOUSE2_LIST();
      this.getWords();
      if (this.userInfo != null)
        this.getHouseName({ aptName: word.word, gugun: this.userInfo.address });
      else this.getHouseName({ aptName: word.word, gugun: 0 });
    },
  },
};
</script>

<style></style>
