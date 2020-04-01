<template>
  <section id="detail">
    <div class="top">
      <div class="top-title">{{ content.title }}</div>
      <div class="top-date">{{ this.date }}</div>
    </div>
    <div class="content-container">
      <img
        :src="'http://192.168.0.44:8081/api/notice/getSmallFile?downloadFileName=' + content.image"
        alt="img"
      />
      <!-- content에는 v-html=""로 받아온 데이터 넣기 -->
      <div class="content">{{ content.tts }}</div>
      <div class="buttons">
        <button>목록으로</button>
        <sns :data="content" />
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-title">
        <span>{{ this.noticeType[this.content.noticeType]}}</span> 카테고리 다른 글
      </div>
      <div class="bottom-list">
        뮤디션 프로젝트 02 Your 스트리밍 이벤트! (~03/25)
        <div>2020.02.20</div>
      </div>
      <div class="bottom-list">
        뮤디션 프로젝트 02 Your 스트리밍 이벤트! (~03/25)
        <div>2020.02.20</div>
      </div>
    </div>
  </section>
</template>

<script>
import { noticeDetail } from "../api/index";
// import { listPage } from "../api/index";
import sns from "../components/detail/sns";

export default {
  name: "noticeDetail",
  components: {
    sns
  },
  data() {
    return {
      content: {},
      date: "",
      noticeType: {
        0: "전체",
        1: "공지",
        2: "이벤트",
        3: "보도자료"
      },
      other: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      let id = this.$route.params.id.split("=")[1];
      var formData = new FormData();
      formData.append("noticeNo", id);
      const res = await noticeDetail.list(formData);
      this.content = res.data.result[0];
      let a = this.content.createDate.substr(0, 10);
      let b = a.split("-");
      this.date = b[0] + "." + b[1] + "." + b[2];

      // var otherData = await new FormData();
      // await otherData.append("noticeType", this.content.noticeType);
      // const res2 = await listPage.list(formData);
      // console.log(res2);
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
    }

    .content {
      margin: 61px 0 24px;
    }

    .buttons {
      margin-bottom: 29px;
      display: flex;
      justify-content: space-between;

      button {
        font-size: 15px;
        color: #303236;
        width: 90px;
        height: 34px;
        border-radius: 4px;
        border: solid 1px #7e7e7e;
        cursor: pointer;
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
