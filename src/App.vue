<template>
  <div id="app">
    <noticeDetail />
  </div>
</template>

<script>
import noticeDetail from "./views/noticeDetail";

export default {
  name: "App",
  components: {
    noticeDetail
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
  letter-spacing: normal;
  margin: 0;
  padding: 0;
}
</style>
