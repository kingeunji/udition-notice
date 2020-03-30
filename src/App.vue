<template>
  <div id="app">
    <noticeList />
    <!-- <policyClassify /> -->
  </div>
</template>

<script>
import noticeList from "./views/noticeList";
// import policyClassify from "./views/policyClassify";
// App.use(cors(require("cors")));

export default {
  name: "App",
  components: {
    noticeList
    // policyClassify
  }
};
</script>

<style lang="scss">
* {
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
  outline: none;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  font-family: SpoqaHanSans;
  letter-spacing: normal;
  margin: 0;
  padding: 0;
}
</style>
