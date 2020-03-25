<template>
  <div id="app">
    <noticeList />
  </div>
</template>

<script>
import noticeList from "./views/noticeList";

export default {
  name: "App",
  components: {
    noticeList
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
