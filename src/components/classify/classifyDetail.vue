<template>
  <div>
    <div class="datail-container">
      <div class="section">
        <div class="board-container">
          <div class="col-3">
            <h3>활성화된 분류</h3>
            <draggable class="list-group" :list="list1" group="people" @change="log">
              <div
                class="list-group-item"
                v-for="(element) in list1"
                :key="element.categoryName"
              >{{ element.categoryName }} ({{ element.termsCnt }})</div>
            </draggable>
          </div>
          <div class="col-3">
            <h3>비활성화 분류</h3>
            <draggable class="list-group" :list="list2" group="people" @change="log">
              <div
                class="list-group-item delete"
                v-for="(element, index) in list2"
                :key="element.categoryName"
                :class="{ refresh: element.deleteBoo == true }"
                @click="handle_delete(index)"
              >{{ element.categoryName }} ({{ element.termsCnt }})</div>
            </draggable>
          </div>
        </div>
      </div>
      <div class="button-container">
        <div>
          <button @click="visible = true" class="add btn-style">분류 추가</button>
          <app-my-modal v-bind:visible="visible" @change="changeModal" :datas="contents.length" />
        </div>
        <div>
          <button @click="visible_save = true" class="save btn-style">저장</button>
          <saveModal
            v-bind:visible="visible_save"
            @change="changeSaveModal"
            @save="goToSave"
            :datas="contents"
          />
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
      newTitle: "",
      delete: false,
      list1: [],
      list2: [],
      contents: [],
      click: "",
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
  methods: {
    handleBrowser: function handleBrowser(e) {
      e.preventDefault();
      e.returnValue = "";
    },
    async fetchData() {
      const res = await classify.list();
      this.contents = res.data.result;
      console.log("데이터", this.contents);

      for (var i = 0; i < this.contents.length; i++) {
        if (this.contents[i].isDelete == 0) {
          this.list1.push(this.contents[i]);
        } else if (this.contents[i].isDelete == 1) {
          this.list2.push(this.contents[i]);
        }
      }
    },
    async goToSave(val) {
      var formData = new FormData();
      formData.set("categoryName", this.datas);

      const res = await classifyUpdate.list(formData);

      console.log(res);

      this.visible_save = val;
    },
    handle_delete(i) {
      console.log("선택 인덱스", i);
      console.log("상태", this.deleteBoo);
      this.click = i;
      if (this.list2[i].deleteBoo == false) {
        this.list2[i].deleteBoo = true;
      } else {
        this.list2[i].deleteBoo = false;
      }
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
  height: auto;
  margin: 0 auto;

  .section {
    .board-container {
      h3 {
        margin-bottom: 20px;
      }

      .col-3:nth-child(2) {
        h3 {
          margin-top: 20px;
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
