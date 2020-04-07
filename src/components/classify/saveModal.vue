<template>
  <div>
    <div class="cover-bg" v-if="modalPlugSave">
      <div class="bg-white">
        <div class="text-wrapper">
          <p>
            <strong>분류 삭제</strong>는 되돌릴 수 없습니다.
            <br />정말
            진행하시겠습니까?
          </p>
          <div class="button-wrapper">
            <button class="left-btn" @click="closeModal">닫기</button>
            <button class="right-btn" @click="goToSave">확인</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { classifyUpdate } from "@/api/index";

export default {
  name: "my-modal",
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    }
    // datas: {
    //   type: Number,
    //   required: true,
    //   createDate: ""
    // }
  },
  data() {
    return {
      modalPlugSave: this.visible_save
    };
  },
  watch: {
    visible(val) {
      this.modalPlugSave = val;
    }
  },
  methods: {
    // handleWrapperClick() {
    //   console.log("emit", this.title);
    //   this.$emit("update:visible", false);
    // },
    closeModal() {
      this.modalPlugSave = false;
      this.$emit("change", false);
    },
    goToSave() {
      // var formData = new FormData();
      // formData.set("categoryName", this.datas);

      // const res = await classifyUpdate.list(formData);

      // console.log(res);
      // this.modalPlugSave = false;
      // this.$emit("change", false);

      this.modalPlugSave = false;
      this.$emit("save", false);
    }
  }
};
</script>

<style lang="scss">
.cover-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
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
