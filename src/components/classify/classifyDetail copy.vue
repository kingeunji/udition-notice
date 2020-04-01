<template>
  <div>
    <div class="datail-container">
      <div class="section">
        <div class="board-container">
          <h3>활성화된 분류</h3>
          <board
            v-for="item in activation"
            :key="item.title"
            :id="board1"
            class="board-1"
          >
            <card :id="card1" class="card-1" draggable="true">
              <p>{{ item.title }} ({{ item.total }})</p>
            </card>
          </board>
          <h3>비활성화 분류</h3>
          <board
            v-for="(item, index) in disabled"
            :key="item.id"
            :id="board2"
            class="board-2"
          >
            <card :id="card2" class="card-2" draggable="true">
              <p
                :class="{ refresh: item.delect == true }"
                @click="handle_delect(index)"
              >
                {{ item.title }} ({{ item.total }})
              </p>
            </card>
          </board>
        </div>
      </div>
      <div class="button-container">
        <div class="">
          <button @click="handle_cancle" class="add btn-style">
            분류추가
          </button>
        </div>
        <div class="modal-save">
          <button @click="handle_save" class="save btn-style">
            저장
          </button>
        </div>
      </div>
      <!-- 분류 추가 모달 등장-->
      <div class="cover-bg" v-if="cancle_modal">
        <div class="bg-white">
          <div class="text-wrapper">
            <h3>분류추가</h3>
            <textarea
              type="text"
              placeholder="추가하고 싶은 분류를 입력해주세요."
              v-model="newTitle"
            />
            <div class="button-wrapper">
              <button class="left-btn" @click="handle_cancle">닫기</button>
              <button class="right-btn" @click="goToSave">확인</button>
            </div>
          </div>
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
import board from "./board";
import card from "./card";
export default {
  name: "",
  data() {
    return {
      visible: false,
      cancle_modal: false,
      save_modal: false,
      newTitle: "",
      delect: false,
      board1: "board1",
      board2: "board2",
      card1: "card1",
      card2: "card2",
      activation: [
        {
          id: 1,
          title: "서비스 이용약관",
          total: 20
        },
        {
          id: 2,
          title: "개인정보 처리방침",
          total: 8
        },
        {
          id: 3,
          title: "유료서비스 이용약관",
          total: 10
        },
        {
          id: 4,
          title: "서비스 이용약관",
          total: 20
        }
      ],
      disabled: [
        {
          id: 1,
          title: "kkkkk",
          total: 3,
          delect: false
        },
        {
          id: 2,
          title: "개인정보 처리방침",
          total: 8,
          delect: false
        },
        {
          id: 3,
          title: "유료서비스 이용약관",
          total: 10,
          delect: false
        },
        {
          id: 4,
          title: "서비스 이용약관",
          total: 20,
          delect: false
        }
      ],
      click: ""
    };
  },
  components: {
    board,
    card
  },
  created() {
    window.addEventListener("beforeunload", function(e) {
      // Cancel the event
      e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
      // Chrome requires returnValue to be set
      e.returnValue = "";
    });
  },
  methods: {
    drop: e => {
      const card_id = e.dataTransfer.getData("card_id");
      const card = document.getElementById(card_id);
      card.style.display = "block";
      e.target.appendChild(card);
    },
    handler: function handler(e) {
      e.preventDefault();
      e.returnValue = "";
      console.log(event);
      alert("정말?");
    },
    handle_delect(i) {
      console.log("선택 인덱스", i);
      console.log("상태", this.delect);
      this.click = i;
      if (this.disabled[i].delect == false) {
        this.disabled[i].delect = true;
      } else {
        this.disabled[i].delect = false;
      }
    },
    handle_cancle() {
      if (this.cancle_modal == false) {
        this.cancle_modal = true;
      } else {
        this.cancle_modal = false;
      }
    },
    handle_save() {
      if (this.save_modal == false) {
        this.save_modal = true;
      } else {
        this.save_modal = false;
      }
    },
    goToSave() {
      console.log("타이틀", this.newTitle);
      if (this.cancle_modal == false) {
        this.cancle_modal = true;
      } else {
        this.cancle_modal = false;
      }
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
      background: red;
      h3 {
        margin-bottom: 20px;
      }

      p {
        position: relative;
        margin-bottom: 15px;
        padding: 10px;
        border: 1px solid #333;
        cursor: pointer;
      }

      .board-2 {
        background: yellow;
        p {
          background: url("../../assets/images/policy/close_r.png") no-repeat
            95% center;
          background-size: 20px 20px;

          &.refresh {
            background: url("../../assets/images/policy/refresh.png") no-repeat
              95% center;
            text-decoration: line-through;
          }
        }
      }
    }

    .activation {
    }
    .disabled {
      margin-top: 50px;

      ul {
        li {
          position: relative;
          span {
            position: absolute;
            right: 10px;
          }
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
