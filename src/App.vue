<template>
  <div id="app">
    <!-- <noticeDetail /> -->
    <policy />
  </div>
</template>

<script>
// import noticeDetail from "./views/noticeDetail";
import policy from "./views/policy";

export default {
  name: "App",
  components: {
    // noticeDetail
    policy
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
