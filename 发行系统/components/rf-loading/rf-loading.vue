<template>
  <!--加载动画-->
  <view class="loading-box">
      <div class="loader">
          <div class="loader-inner ball-spin-fade-loader">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
          </div>
      </div>
  </view>
</template>

<script>
  /**
   * @des 页面加载
   *
   * @author stav stavyan@qq.com
   * @date 2020-03-23 11:43
   * @copyright 2019
   */
	export default {
		name: 'rf-loading',
    props: {
      src: {
      	type: String,
        default: '/static/rage.png',
      },
      content: {
      	type: String,
        default: '加载中...',
      }
    }
	}
</script>

<style scoped>
    .loading-box{
        height: 100vh;
        position: fixed;
        /*background: rgba(0,0,0,0.5);*/
        width: 100%;
        left: 0;
        top: 0;
        z-index: 1000;
    }
    .loader{
        top: 50%;
        left: 50%;
        position: absolute;
    }
    @-webkit-keyframes ball-spin-fade-loader {
        50% {
            opacity: 0.3;
            -webkit-transform: scale(0.4);
            transform: scale(0.4);
        }

        100% {
            opacity: 1;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }

    @keyframes ball-spin-fade-loader {
        50% {
            opacity: 0.3;
            -webkit-transform: scale(0.4);
            transform: scale(0.4);
        }

        100% {
            opacity: 1;
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }

    .ball-spin-fade-loader {
        position: relative;
        top: -10px;
        left: -10px;
    }

    .ball-spin-fade-loader>div:nth-child(1) {
        top: 25px;
        left: 0;
        -webkit-animation: ball-spin-fade-loader 1s -0.96s infinite linear;
        animation: ball-spin-fade-loader 1s -0.96s infinite linear;
    }

    .ball-spin-fade-loader>div:nth-child(2) {
        top: 17.04545px;
        left: 17.04545px;
        -webkit-animation: ball-spin-fade-loader 1s -0.84s infinite linear;
        animation: ball-spin-fade-loader 1s -0.84s infinite linear;
    }

    .ball-spin-fade-loader>div:nth-child(3) {
        top: 0;
        left: 25px;
        -webkit-animation: ball-spin-fade-loader 1s -0.72s infinite linear;
        animation: ball-spin-fade-loader 1s -0.72s infinite linear;
    }

    .ball-spin-fade-loader>div:nth-child(4) {
        top: -17.04545px;
        left: 17.04545px;
        -webkit-animation: ball-spin-fade-loader 1s -0.6s infinite linear;
        animation: ball-spin-fade-loader 1s -0.6s infinite linear;
    }

    .ball-spin-fade-loader>div:nth-child(5) {
        top: -25px;
        left: 0;
        -webkit-animation: ball-spin-fade-loader 1s -0.48s infinite linear;
        animation: ball-spin-fade-loader 1s -0.48s infinite linear;
    }

    .ball-spin-fade-loader>div:nth-child(6) {
        top: -17.04545px;
        left: -17.04545px;
        -webkit-animation: ball-spin-fade-loader 1s -0.36s infinite linear;
        animation: ball-spin-fade-loader 1s -0.36s infinite linear;
    }

    .ball-spin-fade-loader>div:nth-child(7) {
        top: 0;
        left: -25px;
        -webkit-animation: ball-spin-fade-loader 1s -0.24s infinite linear;
        animation: ball-spin-fade-loader 1s -0.24s infinite linear;
    }

    .ball-spin-fade-loader>div:nth-child(8) {
        top: 17.04545px;
        left: -17.04545px;
        -webkit-animation: ball-spin-fade-loader 1s -0.12s infinite linear;
        animation: ball-spin-fade-loader 1s -0.12s infinite linear;
    }

    .ball-spin-fade-loader>div {
        background-color: #ff0000;
        width: 15px;
        height: 15px;
        border-radius: 100%;
        margin: 2px;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        position: absolute;
    }
</style>
