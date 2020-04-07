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
                v-for="(element, i) in list1"
                :key="element.categoryName"
              >{{ element.categoryName }} ({{ element.termsCnt }}) {{ i }}</div>
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
              >
                {{ element.categoryName }} ({{ element.termsCnt }})
                {{ list1.length + i + 1 }}
              </div>
            </draggable>
          </div>
        </div>
      </div>
      <div class="button-container">
        <div>
          <button @click="visible = true" class="add btn-style">분류 추가</button>
          <app-my-modal
            v-bind:visible="visible"
            @change="changeModal"
            :datas="contents.length + 1"
          />
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
      newTitle: "",
      list1: [],
      list2: [],
      contents: [],
      categoryName: "",
      modify: []
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
      // console.log("데이터", this.contents);
      for (var i = 0; i < this.contents.length; i++) {
        if (this.contents[i].isDelete == 0) {
          this.list1.push(this.contents[i]);
        } else if (this.contents[i].isDelete == 1) {
          this.list2.push(this.contents[i]);
        }
      }
    },
    async goToSave(val) {
      for (let i = 0; i < this.modify.length; i++) {
        console.log(this.modify[i].categoryNo);
        var formData = new FormData();
        formData.set("categoryNo", this.modify[i].categoryNo);
        formData.set("status", this.modify[i].status);
        const res = await classifyUpdate.list(formData);
        console.log(res);
      }

      window.location.reload();
      alert("삭제 완료");
      this.visible_save = val;
    },
    // 이미지 토글버튼
    handle_delete(el, i) {
      // console.log("i", i);
      const { list2, modify } = this;
      console.log("deleteBoo 전", this.list2[i].deleteBoo);
      if (list2[i].deleteBoo == true) {
        list2[i].deleteBoo = false;
      } else {
        list2[i].deleteBoo = true;
      }
      // list2[i].deleteBoo = !list2[i].deleteBoo;
      console.log("deleteBoo 후", this.list2[i].deleteBoo);
      if (list2[i].deleteBoo) {
        modify.push({
          categoryNo: el.categoryNo,
          status: 2,
          sortNo: i
        });
        console.log("수정", modify, i);
      } else {
        // sortNo로 클릭한 객체를 modify 배열에서 찾아야해
        for (let idx = 0; idx < modify.length; idx++) {
          console.log("sortNo", modify[idx].sortNo, "i", i);
          // idx는 배열의 index, i는 전체 contents에서 클릭한 항목
          // return (modify[idx].sortNo = i && modify.splice(idx + 1, 1));
        }
        console.log("최종적으로 보낼 데이터", modify);
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
