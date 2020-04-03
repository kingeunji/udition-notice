<template>
  <div>
    <div class="datail-container">
      <div class="section">
        <div class="board-container">
          <div class="col-3">
            <h3>활성화된 분류</h3>
            <draggable
              class="list-group"
              :list="list1"
              group="people"
              @change="log"
            >
              <div
                class="list-group-item"
                v-for="(element, index) in list1"
                :key="element.name"
              >
                {{ element.name }} {{ index }}
              </div>
            </draggable>
          </div>
          <div class="col-3">
            <h3>비활성화 분류</h3>
            <draggable
              class="list-group"
              :list="list2"
              group="people"
              @change="log"
            >
              <div
                class="list-group-item delete"
                v-for="(element, index) in list2"
                :key="element.name"
                :class="{ refresh: element.delete == true }"
                @click="handle_delete(index)"
              >
                {{ element.name }} {{ index }}
              </div>
            </draggable>
          </div>
          <rawDisplayer class="col-3" :value="list1" title="List 1" />

          <rawDisplayer class="col-3" :value="list2" title="List 2" />
        </div>
      </div>
      <div class="button-container">
        <div class="">
          <!-- 테스트용 -->
          <button @click="visible = true" class="add btn-style">
            분류 추가
          </button>
          <app-my-modal v-bind:visible="visible" @change="changeModal" />
        </div>
        <div class="modal-save">
          <button @click="handle_save" class="save btn-style">
            저장
          </button>
        </div>
      </div>

      <!-- 저장 모달 등장-->
      <div class="cover-bg" v-if="save_modal">
        <div class="bg-white">
          <div class="text-wrapper">
            <p>
              <strong>분류 삭제</strong>는 되돌릴 수 없습니다. <br />정말
              진행하시겠습니까?
            </p>
            <div class="button-wrapper">
              <button class="left-btn" @click="handle_save">보류</button>
              <button class="right-btn">확인</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import myModal from "./my-modal";
export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  data() {
    return {
      visible: false,
      cancle_modal: false,
      save_modal: false,
      newTitle: "",
      delete: false,
      list1: [
        { name: "John", id: 1, delete: false },
        { name: "Joao", id: 2, delete: false },
        { name: "Jean", id: 3, delete: false },
        { name: "Gerard", id: 4, delete: false }
      ],
      list2: [
        { name: "Juan", id: 5, delete: false },
        { name: "Edgard", id: 6, delete: false },
        { name: "Johnson", id: 7, delete: false }
      ],
      click: ""
    };
  },
  components: {
    appMyModal: myModal,
    draggable
  },
  created() {
    window.addEventListener("beforeunload", function(e) {
      e.preventDefault();
      e.returnValue = "";
    });
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
    },
    handleClickButton() {
      this.visible = !this.visible;
    },
    handler: function handler(e) {
      e.preventDefault();
      e.returnValue = "";
      console.log(event);
      alert("정말?");
    },
    handle_delete(i) {
      console.log("선택 인덱스", i);
      console.log("상태", this.delete);
      this.click = i;
      if (this.list2[i].delete == false) {
        this.list2[i].delete = true;
      } else {
        this.list2[i].delete = false;
      }
    },
    handle_save() {
      if (this.save_modal == false) {
        this.save_modal = true;
      } else {
        this.save_modal = false;
      }
    },
    changeModal(val) {
      this.visible = val;
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
        background-size: 20px 20px;

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
}
</style>
