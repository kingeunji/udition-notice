<template>
  <div class="content">
    <div v-for="item in items" :key="item.id" class="detail">
      <div class="detail-text">
        <p class="category">{{ item.category }}</p>
        <h3>{{ item.title }}</h3>
        <p class="date">{{ item.date }}</p>
      </div>
      <div class="detail-img">
        <img :src="item.img" alt="noticeimg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "listDetail",
  data() {
    return {
      items: [
        {
          id: 1,
          category: "공지",
          title: "유디션에 오신 걸 환영합니다.",
          date: "2020.02.20",
          img:
            "https://storage.googleapis.com/udition-web/fileFolder/20200323_aad8539d_c1eb_401a_baa8_1b31df47d1c5.jpg"
        },
        {
          id: 2,
          category: "공지",
          title: "뮤디션 프로젝트 02 Your 스트리밍 이벤트! (~03/25)",
          date: "2020.02.20",
          img:
            "https://storage.googleapis.com/udition-web/fileFolder/20200323_aad8539d_c1eb_401a_baa8_1b31df47d1c5.jpg"
        },
        {
          id: 3,
          category: "공지",
          title:
            "벤-바이브 소속사 메이저나인, 오디션앱 유디션과 함께신인 아이돌 뽑는다",
          date: "2020.02.20",
          img:
            "https://storage.googleapis.com/udition-web/fileFolder/20200323_aad8539d_c1eb_401a_baa8_1b31df47d1c5.jpg"
        },
        {
          id: 5,
          category: "공지",
          title: "뮤디션 프로젝트 02 Your 스트리밍 이벤트! (~03/25)",
          date: "2020.02.20",
          img:
            "https://storage.googleapis.com/udition-web/fileFolder/20200323_aad8539d_c1eb_401a_baa8_1b31df47d1c5.jpg"
        },
        {
          id: 6,
          category: "공지",
          title: "뮤디션 프로젝트 02 Your 스트리밍 이벤트! (~03/25)",
          date: "2020.02.20",
          img:
            "https://storage.googleapis.com/udition-web/fileFolder/20200323_aad8539d_c1eb_401a_baa8_1b31df47d1c5.jpg"
        },
        {
          id: 7,
          category: "공지",
          title: "뮤디션 프로젝트 02 Your 스트리밍 이벤트! (~03/25)",
          date: "2020.02.20",
          img:
            "https://storage.googleapis.com/udition-web/fileFolder/20200323_aad8539d_c1eb_401a_baa8_1b31df47d1c5.jpg"
        },
        {
          id: 8,
          category: "공지",
          title: "뮤디션 프로젝트 02 Your 스트리밍 이벤트! (~03/25)",
          date: "2020.02.20",
          img:
            "https://storage.googleapis.com/udition-web/fileFolder/20200323_aad8539d_c1eb_401a_baa8_1b31df47d1c5.jpg"
        },
        {
          id: 9,
          category: "공지",
          title: "뮤디션 프로젝트 02 Your 스트리밍 이벤트! (~03/25)",
          date: "2020.02.20",
          img:
            "https://storage.googleapis.com/udition-web/fileFolder/20200323_aad8539d_c1eb_401a_baa8_1b31df47d1c5.jpg"
        },
        {
          id: 10,
          category: "공지",
          title: "뮤디션 프로젝트 02 Your 스트리밍 이벤트! (~03/25)",
          date: "2020.02.20",
          img:
            "https://storage.googleapis.com/udition-web/fileFolder/20200323_aad8539d_c1eb_401a_baa8_1b31df47d1c5.jpg"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.content {
  .detail {
    display: flex;
    justify-content: space-between;
    padding: 25px 0;
    border-bottom: solid 1px #e5e5e5;
    .detail-text {
      .category {
        margin-top: 15px;
        width: 46px;
        border-radius: 2px;
        border: solid 1px #50b0b1;
        font-size: 14px;
        font-weight: 500;
        line-height: 23px;
        text-align: center;
        color: #50b0b1;
      }

      h3 {
        margin-top: 11px;
        font-size: 19px;
        line-height: 1.32;
        color: #2e3032;
      }

      .date {
        margin-top: 10px;
        font-size: 14px;
        line-height: 1.79;
        color: #b5b5b5;
      }
    }
    .detail-img {
      img {
        width: 200px;
        height: 130px;
      }
    }
  }
}
</style>
