<template>
  <div class="content">
    <div v-for="item in items" :key="item.boardNo" class="detail">
      <div class="detail-text">
        <p class="category">{{ item.boardName }}</p>
        <h3>{{ item.tts }}</h3>
        <p class="date">{{ item.createTime }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      items: []
    };
  },
  created() {
    axios
      .get("appapi.udition.co/api/common/tok/list")
      .then(response => console.log(response))
      .catch(error => console.log(error));
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
