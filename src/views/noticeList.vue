<template>
  <div id="list" class="container m-6">
    <h2>공지사항</h2>
    <div class="list">
      <ul class="select-list">
        <li @click="fetchData(1)" :class="{ active: selected == 1 }">
          전체
        </li>
        <li @click="fetchData(2)" :class="{ active: selected == 2 }">
          공지
        </li>
        <li @click="fetchData(3)" :class="{ active: selected == 3 }">
          이벤트
        </li>
        <li @click="fetchData(4)" :class="{ active: selected == 4 }">
          보도자료
        </li>
      </ul>
      <div class="content-container">
        <listDetail />
        <div class="pagination-container">
          <paginate
            :page-count="20"
            :page-range="3"
            :margin-pages="2"
            :click-handler="clickCallback"
            :prev-text="'<'"
            :next-text="'>'"
            :container-class="'pagination'"
            :page-class="'page-item'"
          >
          </paginate>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Paginate from "vuejs-paginate";
import listDetail from "../components/list/listDetail";

export default {
  name: "noticeList",
  props: {},
  components: {
    listDetail,
    Paginate
  },
  // 초기화
  data() {
    return {
      selected: 1,
      loading: false,
      page: 5
    };
  },
  methods: {
    // fetchData를 click 이벤트에 넣어주고, 인자 안에는 해당 index를 넣어준다.
    // 정의 내용에서는 셀렉 할 때 마다 바뀌는 컨텐츠(axios로 갖고 오는 값)을 넣어주면 된다.
    fetchData(sel) {
      console.log("카테고리", sel);
      this.selected = sel;
    },

    clickCallback(pageNum) {
      console.log("페이지넘버", pageNum);
    }
  }
};
</script>

<style lang="scss">
.container {
  width: 750px;
  margin: 0 auto;
  color: #1f2125;
  h2 {
    width: 155px;
    height: 58px;
    margin: 69px 0 45px 0;
    font-family: NotoSansCJKkr;
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
          }
        }
      }
    }
  }
}
</style>
