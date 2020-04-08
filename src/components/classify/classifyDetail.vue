<template>
  <div>
    <div class="datail-container">
      <div class="section">
        <div class="board-container">
          <div class="col-3">
            <h3>활성화된 분류</h3>
            <draggable class="list-group" :list="list1" group="people">
              <div
                class="list-group-item"
                v-for="element in list1"
                :key="element.categoryName"
              >{{ element.categoryName }} ({{ element.termsCnt }})</div>
            </draggable>
          </div>
          <div class="col-3">
            <h3>비활성화 분류</h3>
            <draggable class="list-group" :list="list2" group="people">
              <div
                class="list-group-item delete"
                v-for="(element, i) in list2"
                :key="element.categoryName"
                :class="{ refresh: element.deleteBoo == true }"
                @click="handle_delete(element, i)"
              >{{ element.categoryName }} ({{ element.termsCnt }})</div>
            </draggable>
          </div>
        </div>
      </div>
      <div class="button-container">
        <div>
          <button @click="visible = true" class="add btn-style">분류 추가</button>
          <app-my-modal v-bind:visible="visible" @change="changeModal" @input="goToAdd" />
        </div>
        <div>
          <button @click="visible_save = true" class="save btn-style">저장</button>
          <saveModal v-bind:visible="visible_save" @change="changeSaveModal" @save="goToSave" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import myModal from "./my-modal";
import saveModal from "./saveModal";
import { classify } from "@/api/index";
import { classifyUpdate } from "@/api/index";
export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  data() {
    return {
      visible: false,
      visible_save: false,
      list1: [],
      list2: [],
      contents: [],
      categoryName: ""
    };
  },
  components: {
    appMyModal: myModal,
    saveModal,
    draggable
  },
  created() {
    window.addEventListener("beforeunload", this.handleBrowser);
    this.fetchData();
  },
  watch: {
    list2() {
      this.handle_delete();
    }
  },
  methods: {
    handleBrowser: function handleBrowser(e) {
      e.preventDefault();
      e.returnValue = "";
    },
    async fetchData() {
      const res = await classify.list();
      this.contents = res.data.result;
      this.contents_modify = this.contents;

      for (var i = 0; i < this.contents.length; i++) {
        if (this.contents[i].isDelete == 0) {
          this.list1.push(this.contents[i]);
        } else if (this.contents[i].isDelete == 1) {
          this.list2.push(this.contents[i]);
        }
      }
    },
    // 이미지 토글버튼 & 약관 카테고리 삭제
    handle_delete(el, i) {
      if (this.list2[i].deleteBoo == true) {
        this.list2[i].deleteBoo = false;
        this.list2[i].status = -1;
      } else {
        this.list2[i].deleteBoo = true;
        this.list2[i].status = 2;
      }
    },
    // 저장버튼
    goToSave(val) {
      //list1
      for (let i = 0; i < this.list1.length; i++) {
        this.list1[i].isDelete = 0;
        this.list1[i].sortNo = i;
        if (this.list1[i].status == -1) {
          this.list1[i].status = 1;
        }
      }
      this.fetchSave(val, this.list1);

      //list2
      for (let i = 0; i < this.list2.length; i++) {
        this.list2[i].isDelete = 1;
        this.list2[i].sortNo = this.list1.length + i;
        if (this.list2[i].status == -1) {
          this.list2[i].status = 1;
        }
      }
      this.fetchSave(val, this.list2);
    },
    async fetchSave(val, arr) {
      console.log(arr);
      for (let i = 0; i < arr.length; i++) {
        var formData = new FormData();
        formData.set("categoryNo", arr[i].categoryNo);
        formData.set("status", arr[i].status);
        formData.set("categoryName", arr[i].categoryName);
        formData.set("isDelete", arr[i].isDelete);
        formData.set("sortNo", arr[i].sortNo);
        const res = await classifyUpdate.list(formData);
        console.log(res);
      }
      window.location.reload();
      alert("저장 완료");
      this.visible_save = val;
    },
    goToAdd(cnt) {
      if (this.list2.length > 0) {
        var no = this.list2[this.list2.length - 1].categoryNo + 1;
        var sort = this.list2.length + 1;
      }
      let content = {
        categoryNo: no ? no : 1,
        categoryName: cnt,
        termsCnt: 0,
        status: 0,
        isDelete: 1,
        sortNo: sort ? sort : 1,
        deleteBoo: "false"
      };
      this.list2.push(content);
    },
    changeModal(val) {
      this.visible = val;
    },
    changeSaveModal(val) {
      this.visible_save = val;
    }
  }
};
</script>
<style lang="scss">
.datail-container {
  width: 500px;
  margin: 0 auto;
  .section {
    .board-container {
      h3 {
        margin-bottom: 20px;
        font-weight: bold;
      }
      .col-3:nth-child(2) {
        h3 {
          margin-top: 40px;
        }
      }
      .list-group-item {
        margin-bottom: 15px;
        padding: 10px;
        border: 1px solid #333;
        cursor: pointer;
        background-size: 15px 15px;
        &.delete {
          background: url("../../assets/images/policy/close_r.png") no-repeat
            96% center;
        }
        &.refresh {
          background: url("../../assets/images/policy/refresh.png") no-repeat
            96% center;
          text-decoration: line-through;
        }
      }
    }
  }
  .button-container {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .btn-style {
      width: 100px;
      padding: 10px 0;
      border: 0;
      border: 1px solid #333;
      background: none;
      font-size: 13px;
      cursor: pointer;
      &:hover {
        background: #e5e5e5;
        font-weight: 700;
      }
    }
  }
}
</style>
