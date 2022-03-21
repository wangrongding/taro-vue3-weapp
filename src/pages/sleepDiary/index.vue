<template>
  <view class="page-container">
    <NavBar>梦琦</NavBar>
    <view class="page-main">
      <view>
        <image
          class="close"
          src="https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png"
          alt=""
          @tap="close"
        />
      </view>
      <image
        class="bear"
        src="https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png"
        alt=""
      />
      <view class="titel"> 睡眠日记 </view>
      <view class="detail">
        每天早上起床后完成你的睡眠日记非常重要，这意味着我们能够得到你睡眠问题的准确信息，以便我们开启有效的方法来改善它，这是走向成功的第一步。
      </view>
      <view class="energy-data">
        20
        <image
          class="energy-value-img"
          src="https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png"
          alt=""
        />
      </view>
      <view class="start-btn" @tap="startBtn"> 开始 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import NavBar from "../../components/NavBar.vue";
import Taro from "@tarojs/taro";
const state = reactive({});
function close() {
  Taro.redirectTo({
    url: "/pages/index/index",
    success() {},
  });
}
function startBtn() {
  Taro.redirectTo({
    url: "/pages/sleepDiary/testQuestions/index",
    success() {},
  });
}
</script>

<style lang="scss">
.page-container {
  background: url("https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452455.png");
  background: rgba(137, 144, 254, 1);
  background-size: 100% auto;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .page-main {
    position: relative;
    height: 100%;
    .close {
      width: 38px;
      height: 38px;
      background: #fff;
      margin: 44px 0 0 20px;
    }
    .bear {
      width: 140px;
      height: 180px;
      background: #fff;
      margin-left: 117.5px;
    }
    .titel {
      font-size: 22px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
      margin-top: 10px;
    }
    .detail {
      font-size: 17px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      width: 335px;
      margin: 15px auto;
      text-indent: 25px;
    }
    .energy-data {
      margin-top: 88.5px;
      font-size: 22px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
      .energy-value-img {
        width: 12px;
        height: 16px;
        background: #fff;
      }
    }
    .start-btn {
      width: 142px;
      height: 58px;
      line-height: 58px;
      background: #ffffff;
      border-radius: 15px;
      font-size: 15px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #60d394;
      margin: 10px auto;
      text-align: center;
    }
  }
}
</style>
