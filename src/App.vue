<template>
  <div id="app">
    <div id="nav">
        <!-- <QnaHeader /> -->
        <main-header />
        <router-view/>
    </div>
  </div>
</template>

<script>
  //import QnaHeader from "@/components/QnaHeader.vue";
  import MainHeader from "@/components/MainHeader.vue";
  export default {
     created() {
       //this.$router.push("/");
     },
    components: {
      //QnaHeader, 
      MainHeader
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a.router-link-active {
  font-size: 12.5px;
  color: white;
}

#nav a.router-link-exact-active {
  font-size: 14px;
  color: #42b983;
}

table{width:100%; border-collapse:collapse;}
.wrap{width:100%;}
.container{width:800px; margin:0 auto;}
.btnWrap span p{padding:10px; background:#34445c; color:#fff; }
.pagination {
   position: absolute;
 bottom: 0;
 left: 50%;
 transform: translateX( -50% );
 justify-content: center;
}

</style>
