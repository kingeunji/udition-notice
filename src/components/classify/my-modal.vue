<template>
  <div class="newTitle">
    <div class="cover-bg" v-if="modalPlug">
      <div class="bg-white">
        <div class="text-wrapper">
          <h3>분류추가</h3>
          <textarea type="text" placeholder="추가하고 싶은 분류를 입력해주세요." v-model="newTitle" />
          <div class="button-wrapper">
            <button class="left-btn" @click="closeModal">닫기</button>
            <button class="right-btn" @click="goToAdd">확인</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { classifyUpdate } from "@/api/index";

export default {
  name: "newTitle",
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    datas: {
      type: Number,
      required: true,
      createDate: ""
    }
  },
  data() {
    return {
      modalPlug: this.visible,
      newTitle: ""
    };
  },
  watch: {
    visible(val) {
      this.modalPlug = val;
    }
  },
  methods: {
    // handleWrapperClick() {
    //   console.log("emit", this.title);
    //   this.$emit("update:visible", false);
    // },
    closeModal() {
      this.modalPlug = false;
      this.$emit("change", false);
    },
    async goToAdd() {
      var formData = new FormData();
      formData.set("categoryName", this.newTitle);
      formData.set("status", 0);
      formData.set("isDelete", 1);
      formData.set("sortNo", this.datas);
      const res = await classifyUpdate.list(formData);
      // console.log("내용", this.newTitle);
      // console.log("보내는 데이터", res);
      // console.log("프롭스값", this.datas);
      this.modalPlug = false;
      this.$emit("change", false);
      if (res.status == 200) {
        window.location.reload();
        alert("추가 완료");
      }
    }
  }
};
</script>

<style lang="scss">
.cover-bg {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  .bg-white {
    background-color: white;
    padding: 20px;
    width: 350px;
    border-radius: 5px;
    .text-wrapper {
      text-align: center;
      font-size: 18px;
      padding: 15px;

      h3 {
        margin-bottom: 30px;
      }

      p {
        margin: 30px 0;
        strong {
          font-weight: bold;
        }
      }

      textarea {
        padding: 3px;
        width: 250px;
        height: 100px;
        resize: none;
        font-size: 18px;
      }

      .button-wrapper {
        margin: 10px 0 30px 0;
        padding: 0 15px;
        display: flex;
        justify-content: space-between;

        button {
          width: 60px;
          line-height: 30px;
          font-size: 15px;
          background: #f3f3f3;
          border: none;
          border: 1px solid #333;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
