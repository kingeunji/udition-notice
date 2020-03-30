<template>
  <div>
    <div class="datail-container">
      <div class="section">
        <div class="board-container">
          <h3>활성화된 분류</h3>
          <board id="board-1">
            <card id="card-1" draggable="true">
              <p>서비스 이용약관 (4)</p>
              <p>유료서비스 이용약관 (1)</p>
              <p>개인정보 처리방침 (1)</p>
            </card>
          </board>
          <h3>비활성화 분류</h3>
          <board id="board-2">
            <card id="card-2" draggable="true">
              <p>유료서비스 이용약관 (1)</p>
              <p>개인정보 처리방침 (1)</p>
            </card>
          </board>
        </div>
        <div class="activation">
          <ul>
            <li>서비스 이용약관 (4)</li>
            <li>유료서비스 이용약관 (1)</li>
            <li>개인정보 처리방침 (1)</li>
          </ul>
        </div>
        <div class="disabled">
          <ul>
            <li>
              서비스 이용약관 (4)
              <span>x</span>
            </li>
            <li>유료서비스 이용약관 (1)</li>
            <li>개인정보 처리방침 (1)</li>
          </ul>
        </div>
      </div>
      <div class="button-container">
        <div class="">
          <button @click="handleClickButton" class="add btn-style">
            분류추가
          </button>
          <app-my-modal title="분류 추가" :visible.sync="visible">
            <div>
              분류 삭제는 되돌릴수 없습니다. 정말 진행하시겠습니까?
            </div>
          </app-my-modal>
        </div>
        <div class="modal-save">
          <button @click="handleClickButton" class="save btn-style">
            저장
          </button>
          <app-my-modal title="저장" :visible.sync="visible">
            <div>
              분류 삭제는 되돌릴수 없습니다. 정말 진행하시겠습니까?
            </div>
          </app-my-modal>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import myModal from "./my-modal";
import board from "./board";
import card from "./card";
export default {
  name: "",
  props: ["id"],
  data() {
    return {
      visible: false
    };
  },
  components: {
    appMyModal: myModal,
    board,
    card
  },
  methods: {
    handleClickButton() {
      this.visible = !this.visible;
    },
    drop: e => {
      const card_id = e.dataTransfer.getData("card_id");
      const card = document.getElementById(card_id);
      card.style.display = "block";
      e.target.appendChild(card);
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
        margin-bottom: 15px;
        padding: 10px;
        border: 1px solid #333;
        cursor: pointer;
      }

      .board {
        background: yellow;
      }

      #board-2 {
        margin-top: 50px;
        background: yellow;
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
}
</style>
