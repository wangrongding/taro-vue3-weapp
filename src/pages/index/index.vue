<script setup lang="ts">
import { reactive } from "vue";
// import Taro from "@tarojs/taro";
import NavBar from "@/components/NavBar.vue";
import "./index.scss";
const state = reactive({
  text: "Hello i'am rongding...",
  assets: {
    icon: "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452915.png",
    bear: "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202281513430.png",
    background:
      "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452455.png",
  },
});
</script>

<template>
  <view class="page-container">
    <NavBar>首页</NavBar>
    <view class="main">
      <view class="operation-bar">
        <image :src="state.assets.icon" alt="" />
        <image :src="state.assets.icon" alt="" />
      </view>
      <view class="operation-bar">
        <image :src="state.assets.icon" alt="" />
        <image :src="state.assets.icon" alt="" />
      </view>
      <view class="bear-area">
        <image class="bear" :src="state.assets.bear" alt="" />
        <view class="honeypot"> 蜜罐 </view>
      </view>
      <view class="operation-bar bottom-bar">
        <image :src="state.assets.icon" alt="" />
        <image :src="state.assets.icon" alt="" />
        <image :src="state.assets.icon" alt="" />
        <image :src="state.assets.icon" alt="" />
        <image :src="state.assets.icon" alt="" /> </view
    ></view>
  </view>
</template>

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
  .main {
    margin-top: 20px;
    height: 100%;
    position: relative;
    flex: 1;
    .operation-bar {
      // width: 100%;
      padding: 0 42px;
      margin-bottom: 36px;
      display: flex;
      justify-content: space-between;
      image {
        width: 88px;
        height: 108px;
      }
    }
    .bear-area {
      height: 400px;
      width: 100%;
      position: absolute;
      bottom: 350px;
      // display: flex;
      // flex-direction: row;
      // justify-content: center;
      text-align: center;
      .bear {
        width: 300px;
        height: 400px;
        align-items: center;
      }
      .honeypot {
        position: absolute;
        right: 50px;
        bottom: 50px;
        border-radius: 50%;
        border: 1px solid red;
        width: 100px;
        height: 100px;
      }
    }
    .bottom-bar {
      position: absolute;
      width: 100%;
      box-sizing: border-box;
      bottom: 0px;
      // margin-bottom: 70px;
    }
  }
}
</style>
