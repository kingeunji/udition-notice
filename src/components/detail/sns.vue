<template>
  <div class="icon-container">
    <div class="twitter" @click="shareSNS(data, 1)">
      <img src="../../assets/images/sns/twitter.png" alt="twitter" />
    </div>
    <div class="naver" @click="shareSNS(data, 2)">
      <img src="../../assets/images/sns/naver.png" alt="naver" />
    </div>
    <div class="line" @click="shareLine(data)">
      <img src="../../assets/images/sns/line.png" alt="line" />
    </div>
    <div class="kakao">
      <img src="../../assets/images/sns/kakao.png" alt="kakao" />
    </div>
    <div class="facebook" @click="ShareFacebook(data)">
      <img src="../../assets/images/sns/facebook.png" alt="facebook" />
    </div>
    <div class="share">
      <img src="../../assets/images/sns/share.png" alt="share" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    shareSNS: function(data, num) {
      var url = encodeURI(encodeURIComponent(data.url));
      var title = encodeURI(data.title);
      if (num === 1) {
        var shareURL =
          "https://twitter.com/intent/tweet?url=" + url + "&title=" + title;
        document.location = shareURL;
      } else if (num === 2) {
        var shareURL2 =
          "https://share.naver.com/web/shareView.nhn?url=" +
          url +
          "&title=" +
          title;
        document.location = shareURL2;
      }
    },
    shareLine: function(data) {
      var shareURL =
        "http://line.me/R/msg/text?" +
        encodeURIComponent(data.title + data.url);
      document.location = shareURL;
    },
    ShareFacebook: function(data) {
      var shareURL = "https://www.facebook.com/sharer/sharer.php?u=" + data.url;
      document.location = shareURL;
    }
  }
};
</script>

<style scoped lang="scss">
.icon-container {
  display: flex;

  div {
    width: 33px;
    height: 33px;
    border-radius: 50%;
    margin-left: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &.twitter {
      border: solid 1px #1da1f2;

      img {
        width: 16px;
        height: 13px;
      }
    }

    &.naver {
      border: solid 1px #06be34;

      img {
        width: 13px;
        height: 12px;
      }
    }

    &.line {
      border: solid 1px #06be34;

      img {
        width: 19px;
        height: 18px;
      }
    }

    &.kakao {
      border: solid 1px #e4d536;

      img {
        width: 20px;
        height: 18px;
      }
    }

    &.facebook {
      border: solid 1px #1877f2;

      img {
        width: 10px;
        height: 18px;
      }
    }

    &.share {
      border: solid 1px #64b9ba;

      img {
        width: 15px;
        height: 16px;
      }
    }

    img {
      object-fit: contain;
    }
  }
}
</style>
