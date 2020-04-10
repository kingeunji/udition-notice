<template>
  <section class="policy" :class="$mq">
    <div class="top">
      <div>약관 및 정책</div>
      <ul>
        <li
          v-for="(category, i) in categorys"
          :key="category.id"
          @click="selectCategory(category.id, i)"
          :class="{ active: i == 0 }"
        >{{ category.title }}</li>
      </ul>
    </div>
    <div class="content-container">
      <select v-model="termsNo">
        <option v-for="(version, i) in versions" :key="i" :value="i">
          {{
          version.version
          }}
        </option>
      </select>
      <div
        class="ql-editor"
        v-html="
          this.content[this.termsNo] && this.content[this.termsNo].contents
        "
      ></div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import VueQuillEditor from "vue-quill-editor";
import { policy } from "@/api/index";
import { versionList } from "@/api/index";

Vue.use(VueQuillEditor);

export default {
  name: "policy",
  components: {},
  data() {
    return {
      categorys: [
        { id: 1, title: "서비스 이용약관" },
        { id: 2, title: "유료서비스 이용약관" },
        { id: 3, title: "개인정보 처리방침" }
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
    }
  },
  methods: {
    // 카테고리 순서 이동
    selectCategory: function(id, i) {
      // 클릭한 카테고리의 세부 내역 데이터를 가져오기 위해서 id값을 categoryNo에 저장
      this.categoryNo = id;
      // 카테고리 넘어갔을 때, 버전리스트 초기화
      this.termsNo = 0;
      // 클릭한 카테고리 자르고 unshift로 카테고리 배열 앞에 추가
      let a = this.categorys.splice(i, 1);
      this.categorys.unshift(a[0]);
    },

    // 카테고리에 맞는 데이터 호출
    async fetchData() {
      var formData = new FormData();
      formData.append("categoryNo", this.categoryNo);
      const res = await policy.list(formData);
      this.content = res.data.result;
      console.log(this.content);

      // 카테고리에 맞는 버전 데이터 호출
      const resVer = await versionList.list(formData);
      this.versions = resVer.data.result;
    }
  }
};
</script>

<style lang="scss">
.small {
  width: 370px;
  padding: 0 10px;

  &.policy {
    .top {
      div {
        font-size: 28px;
      }
      ul {
        li {
          font-size: 14px;
          margin-right: 10px;
        }
      }
    }
  }
}

.large {
  width: 100%;
  min-width: 500px;
  padding: 0 30px;
}

.policy {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 750px;
  margin: 57px auto 0;

  .top {
    width: 100%;
    margin: 0;

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
    padding: 0;
    border: none;

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

    .ql-editor {
      p strong em u {
        font-style: italic;
        font-weight: bold;
        border-bottom: 1px solid black;
      }
      p strong em {
        font-style: italic;
        font-weight: bold;
      }
      p strong u {
        font-weight: bold;
        border-bottom: 1px solid black;
      }
      p em u {
        font-style: italic;
        border-bottom: 1px solid black;
      }
      p strong {
        font-weight: bold;
      }
      p em {
        font-style: italic;
      }
      p u {
        border-bottom: 1px solid black;
      }
    }
  }
}
</style>
