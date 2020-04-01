<template>
  <section id="detail">
    <!-- 전체적으로 api로 데이터 받아와야해 -->
    <div class="top">
      {{ items.title }}
      <div>{{ items.date }}</div>
    </div>
    <div class="content-container">
      <img :src="items.img" alt="img" />
      <!-- content에는 v-html=""로 받아온 데이터 넣기 -->
      <div class="content">
        안녕하세요? 유디션입니다. 비즈니스 계정으로 전환하면 오디션 등록이
        가능합니다! 훌륭한 아티스트가 필요한 기업인가요? 비즈니스 계정으로
        전환하여 오디션을 열고 아티스트들을 모집해보세요!비즈니스 계정으로
        전환은 [마이유디션] > [비즈니스 계정 전환] 에서 할 수 있습니다. Tip!
        오디션의 내용이 자세하고 친절할수록 더 많은 아티스트들이 지원하게 될
        거예요! 다만, 등록되는 모든 오디션은 유디션의 ‘이용약관'에 준해야 하며,
        오디션 내용에 문제가 있다고 판단될 경우 유디션은 해당 오디션을 삭제할 수
        있습니다. 어쩌구하는 유디션이 되겠습니다. 감사합니다.
      </div>
      <div class="buttons">
        <button>목록으로</button>
        <sns :data="items" />
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-title">
        <!-- '공지'는 선택한 카테고리에 맞게 바꾸기 -->
        <span>공지</span> 카테고리 다른 글
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
import sns from "../components/detail/sns";

export default {
  name: "noticeDetail",
  components: {
    sns
  },
  data() {
    return {
      items: {
        url: "https://www.udition.co/auditions/",
        title:
          "벤-바이브 소속사 메이저나인, 오디션앱 유디션과 함께신인 아이돌 뽑는다",
        date: "2020.02.20",
        img:
          "https://storage.googleapis.com/udition-web/fileFolder/20191213_167311c2_2482_46f9_a81d_5fcf768bec51.jpeg"
      }
    };
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
    height: 68px;
    font-family: NotoSansCJKkr;
    font-size: 24px;
    line-height: 1.25;
    color: #1f2125;
    position: relative;
    text-align: start;
    margin: 75px 0 30px;

    div {
      height: 22px;
      font-size: 14px;
      line-height: 1.79;
      color: #b5b5b5;
      position: absolute;
      bottom: 0;
    }
  }

  /* 본문 */
  .content-container {
    padding-top: 56px;
    border-top: solid 1px #e5e5e5;
    border-bottom: solid 1px #e5e5e5;

    img {
      width: 750px;
      height: 750px;
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
