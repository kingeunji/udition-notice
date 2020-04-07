<template>
  <section id="detail">
    <div class="top">
      <div class="top-title">{{ content.title }}</div>
      <div class="top-date">
        {{ this.content.createDate && convertToDate(this.content.createDate) }}
      </div>
    </div>
    <div class="content-container">
      <img
        :src="
          'http://192.168.0.44:8081/api/notice/getSmallFile?downloadFileName=' +
          content.image
        "
        alt="img"
        :class="{
          active: content.image.length > 0 ? image == true : image == false,
        }"
      />
      <div class="ql-editor">
        <div v-html="content.tts"></div>
        <!-- <strong style="font-weight: bold !important;"></strong> -->
      </div>
      <div class="buttons">
        <button>
          <router-link to="/notice">목록으로</router-link>
        </button>
        <sns :data="content" />
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-title">
        <span>{{ this.noticeType[this.content.noticeType] }}</span> 카테고리
        다른 글
      </div>
      <div class="bottom-list" @click="goToDetail(content.preNoticeNo1)">
        {{ this.content.preTitle1 }}
        <div>
          {{
            this.content.preNoticeNo1 &&
            convertToDate(this.content.preCreateDate1)
          }}
        </div>
      </div>
      <div class="bottom-list" @click="goToDetail(content.preNoticeNo2)">
        {{ this.content.preTitle2 }}
        <div>
          {{
            this.content.preNoticeNo2 &&
            convertToDate(this.content.preCreateDate2)
          }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import VueQuillEditor from "vue-quill-editor";
// import Quill from "quill";

Vue.use(VueQuillEditor);
// Vue.use(Quill);

import { noticeDetail } from "@/api/index";
import sns from "@/components/detail/sns";

export default {
  name: "noticeDetail",
  components: {
    sns,
  },
  data() {
    return {
      content: {},
      date: [],
      newDate: [],
      noticeType: {
        0: "전체",
        1: "공지",
        2: "이벤트",
        3: "보도자료",
      },
      image: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      let id = this.$route.params.id;
      let type = this.$route.params.type;
      var formData = new FormData();
      formData.append("noticeNo", id);
      formData.append("noticeType", type);
      const res = await noticeDetail.list(formData);
      this.content = res.data.result[0];
      console.log("내용", this.content.tts);
    },
    convertToDate(date) {
      return new Date(date).toISOString().slice(0, 10);
    },
    goToDetail(num) {
      let type = this.content.noticeType;
      this.$router.push({ name: "detail", params: { id: num, type: type } });
    },
  },
};
</script>

<style scope lang="scss">
/* scope 빼면 edit 스타일 적용이 된다. */
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 750px;
  margin: 0 auto;

  /* 제목 */
  .top {
    width: 100%;
    min-height: 68px;
    text-align: start;

    margin: 75px 0 30px;

    &-title {
      font-family: NotoSansCJKkr;
      font-size: 24px;
      color: #1f2125;
    }

    &-date {
      height: 22px;
      font-size: 14px;
      line-height: 1.79;
      color: #b5b5b5;
      margin-top: 15px;
    }
  }

  /* 본문 */
  .content-container {
    width: 100%;
    padding-top: 56px;
    border-top: solid 1px #e5e5e5;
    border-bottom: solid 1px #e5e5e5;

    img {
      width: 750px;
      height: auto;
      margin-bottom: 61px;

      &.active {
        display: none;
      }
    }

    .ql-editor {
      margin-bottom: 24px;

      /* h1.ql-align-center {
        strong.ql-font-monospace {
          em {
            u {
              font-weight: bold;
              text-decoration: underline;
            }
          }
        }
      } */

      /* u {
        font-weight: bold !important;
        color: red !important;
      }  */
      /* .ql-editor .ql-font-monospace u {
        font-weight: bold;
        border-bottom: 1px solid black;
      }

      .ql-editor strong em u {
        font-style: italic;
        font-weight: bold;
        border-bottom: 1px solid black;
      }
      .ql-editor strong em {
        font-style: italic;
        font-weight: bold;
      }
      .ql-editor strong u {
        font-weight: bold;
        border-bottom: 1px solid black;
      }
      .ql-editor em u {
        font-style: italic;
        border-bottom: 1px solid black;
      }
      strong {
        font-weight: bold;
      }
      .ql-editor em {
        font-style: italic;
      }
      .ql-editor u {
        border-bottom: 1px solid black;
      }
      .quill-editor {
        height: 500px;
      } */
    }

    .buttons {
      margin-bottom: 29px;
      display: flex;
      justify-content: space-between;

      button {
        font-size: 15px;
        width: 90px;
        height: 34px;
        border-radius: 4px;
        border: solid 1px #7e7e7e;
        cursor: pointer;

        a {
          color: #303236;
        }
      }
    }
  }

  /* 하단(다른 글) */
  .bottom {
    width: 100%;

    &-title {
      margin: 22px 0;
      height: 32px;
      font-family: NotoSansCJKkr;
      font-size: 17px;
      font-weight: bold;
      line-height: 1.76;
      color: #303236;

      span {
        font-family: NotoSansCJKkr;
        font-size: 17px;
        font-weight: bold;
        line-height: 1.76;
        color: #64b9ba;
      }
    }

    &-list {
      font-size: 17px;
      line-height: 1.47;
      color: #2e3032;
      border-top: solid 1px #e5e5e5;
      padding: 30px 0;
      cursor: pointer;

      div {
        font-size: 14px;
        line-height: 1.79;
        color: #b5b5b5;
      }
    }
  }
}
</style>
