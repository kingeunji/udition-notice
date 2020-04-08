<template>
  <div id="list" class="container m-6">
    <h2>공지사항</h2>
    <div class="list">
      <ul class="select-list">
        <li @click="noticeType = 0" :class="{ active: noticeType == 0 }">
          전체
        </li>
        <li @click="noticeType = 1" :class="{ active: noticeType == 1 }">
          공지
        </li>
        <li @click="noticeType = 2" :class="{ active: noticeType == 2 }">
          이벤트
        </li>
        <li @click="noticeType = 3" :class="{ active: noticeType == 3 }">
          보도자료
        </li>
      </ul>
      <div class="content-container">
        <listDetail :datas="noticeList" />
        <div class="pagination-container">
          <paginate
            v-model="pageNum"
            :page-count="this.pageCount"
            :page-range="3"
            :margin-pages="2"
            :click-handler="clickCallback"
            :prev-text="'<'"
            :next-text="'>'"
            :container-class="'pagination'"
            :page-class="'page-item'"
          ></paginate>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Paginate from "vuejs-paginate";
import { listPage } from "@/api/index";
import listDetail from "@/components/list/listDetail";

export default {
  name: "noticeList",
  props: {},
  components: {
    listDetail,
    Paginate,
  },
  // 초기화, 기본 값 설정
  data() {
    return {
      requestPage: 0,
      noticeType: 0,
      noticeList: [],
      pageCount: 0,
      pageNum: 0,
    };
  },
  watch: {
    noticeType() {
      this.fetchData();
      this.requestPage = 0;
      this.pageNum = 1;
    },
    requestPage() {
      this.fetchData();
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    // fetchData를 click 이벤트에 넣어주고, 인자 안에는 해당 index를 넣어준다.
    // 정의 내용에서는 셀렉 할 때 마다 바뀌는 컨텐츠(axios로 갖고 오는 값)을 넣어주면 된다.
    async fetchData() {
      let formData = new FormData();
      formData.append("requestPage", this.requestPage);
      formData.append("noticeType", this.noticeType);

      // API list(formData);
      const response = await listPage.list(formData);
      this.noticeList = response.data.result;

      // 페이지네이션 번호 범위 지정
      this.pageCount = Math.ceil(this.noticeList[0].noticeCnt / 10);
    },
    async clickCallback(pageNum) {
      window.scrollTo(0, 0);
      this.requestPage = pageNum - 1;
      this.fetchData();

      this.pageNum = pageNum;
    },
  },
};
</script>

<style scope lang="scss">
.container {
  width: 750px;
  margin: 0 auto;
  color: #1f2125;
  h2 {
    margin: 69px 0 45px 0;
    font-size: 42px;
    font-weight: bold;
    line-height: 1.38;
    text-align: center;
  }

  .list {
    .select-list {
      display: flex;

      li {
        margin-right: 20px;
        padding-bottom: 15px;
        cursor: pointer;

        &.active {
          font-weight: bold;
          border-bottom: 4px solid #50b0b1;
        }
      }
    }

    .content-container {
      border-top: solid 1px #e5e5e5;
      .pagination-container {
        margin: 68px 0 207px 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .pagination {
          display: flex;

          .page-item {
            padding: 0 10px;
            color: #aaaaaa;
          }

          .active {
            font-weight: 900;
            color: #2e3032;
          }
        }
      }
    }
  }
}
</style>
