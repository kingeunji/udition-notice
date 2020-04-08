<template>
  <div class="content">
    <div
      @click="goToDetail(data)"
      v-for="data in datas"
      :key="data.noticeNo"
      class="detail"
    >
      <div class="detail-text">
        <p class="category">{{ noticeType[data.noticeType] }}</p>
        <h3>{{ data.title }}</h3>
        <p class="date">{{ convertToDate(data.createDate) }}</p>
      </div>
      <div class="detail-img">
        <img
          :src="
            'http://192.168.0.44:8081/api/notice/getSmallFile?downloadFileName=' +
            data.image
          "
          alt="noticeimg"
          :class="{
            active: data.image.length > 10 ? image == true : image == false,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    datas: {
      type: Array,
      required: true,
      createDate: "",
    },
  },
  data() {
    return {
      loading: false,
      page: 0,
      noticeType: {
        0: "전체",
        1: "공지",
        2: "이벤트",
        3: "보도자료",
      },
      image: false,
    };
  },
  methods: {
    goToDetail(data) {
      let num = data.noticeNo;
      let type = data.noticeType;
      this.$router.push({ name: "detail", params: { id: num, type: type } });
    },
    convertToDate(date) {
      return new Date(date).toISOString().slice(0, 10);
    },
  },
};
</script>

<style scope lang="scss">
.content {
  .detail {
    display: flex;
    justify-content: space-between;
    padding: 25px 0;
    border-bottom: solid 1px #e5e5e5;
    cursor: pointer;
    .detail-text {
      .category {
        margin-top: 15px;
        padding: 2px 5px;
        display: inline-block;
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

        &.active {
          display: none;
        }
      }
    }
  }
}
</style>
