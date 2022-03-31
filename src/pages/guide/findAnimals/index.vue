<template>
  <view class="page-container">
    <NavBar>梦琦</NavBar>
    <view class="page-main">
      <view class="page-name">草丛里面有一些声音</view>
      <view @tap="state.jumpTo" class="page-btn"> 继续 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
import NavBar from "../../../components/NavBar.vue";

const state = reactive({
  jumpTo() {
    Taro.redirectTo({
      url: "/pages/guide/guidingProcess/index?index=0",
    });
  },
});
</script>
<style lang="scss">
.page-container {
  background: url("https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452455.png");
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
    display: flex;
    flex-direction: column;

    .page-name {
      writing-mode: vertical-lr;
      font-size: 22px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #ffffff;
      line-height: 30px;
      margin: 66px auto 0 auto;
      letter-spacing: 10px;
      flex: 1;
    }

    .page-btn {
      width: 142px;
      height: 58px;
      line-height: 58px;
      background: #ffffff;
      border-radius: 15px;
      font-size: 15px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: rgba(96, 211, 148, 1);
      margin: 0 auto 50px auto;
      text-align: center;
    }
  }
}
</style>
