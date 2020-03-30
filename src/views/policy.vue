<template>
  <section>
    <div class="top">
      <div>약관 및 정책</div>
      <ul>
        <li
          v-for="(category, i) in categorys"
          :key="i"
          @click="selectCategory(i + 1)"
          :class="{active: i == 0}"
        >{{ category }}</li>
      </ul>
    </div>
    <div class="content-container">
      <select id="num" @change="selectTerms()">
        <option v-for="(version, i) in versions" :key="i" :value="i" selected>{{ version.version }}</option>
      </select>
      <div class="content">{{ this.content[this.termsNo].contents }}</div>
    </div>
  </section>
</template>

<script>
import { policy } from "../api/index";
import { versionList } from "../api/index";

export default {
  name: "policy",
  components: {},
  data() {
    return {
      categorys: [
        "서비스 이용약관",
        "유료서비스 이용약관",
        "개인정보 처리방침"
      ],
      categoryNo: 1,
      termsNo: 0,
      content: [],
      versions: []
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    categoryNo() {
      this.fetchData();
    },
    termsNo() {}
  },
  methods: {
    selectCategory: function(i) {
      this.categoryNo = i;
      let a = this.categorys.splice(i - 1, 1);
      this.categorys.unshift(a[0]);
    },
    // form-data형식으로 데이터를 담아서 백한테 보내준다.
    async fetchData() {
      console.log(this.catrgorys);
      var formData = new FormData();
      formData.append("categoryNo", this.categoryNo);
      const res = await policy.list(formData);
      this.content = res.data.result;
      // version list data
      const resVer = await versionList.list(formData);
      this.versions = resVer.data.result;
    },
    selectTerms: function() {
      var numCheck = document.getElementById("num");
      this.termsNo =
        numCheck.options[document.getElementById("num").selectedIndex].value;
      console.log("termsNo2", this.termsNo);
    }
  }
};
</script>

<style scoped lang="scss">
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 750px;
  margin: 57px auto 0;

  .top {
    width: 100%;

    div {
      height: 38px;
      font-size: 32px;
      font-weight: bold;
      color: #2e3032;
    }

    ul {
      display: flex;
      padding: 26px 0 32px;
      border-bottom: solid 1px #e5e5e5;

      li {
        width: auto;
        height: 20px;
        font-size: 17px;
        font-weight: bold;
        color: #2e3032;
        margin-right: 22px;
        cursor: pointer;

        &.active {
          color: #e73c3e;
        }
      }
    }
  }

  .content-container {
    width: 100%;

    select {
      width: 126px;
      height: 34px;
      font-size: 15px;
      color: #2e3032;
      border-radius: 4px;
      border: none;
      background-color: #f2f2f2;
      margin: 33px 0 36px;
      text-indent: 18px;
    }
  }
}
</style>
