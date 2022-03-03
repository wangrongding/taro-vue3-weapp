<script setup lang="ts">
import { reactive } from "vue";
import { getIntimacy } from "@/api/home/index";
import Taro from "@tarojs/taro";
import NavBar from "@/components/NavBar.vue";
import "./index.scss";
import { useStore } from "@/stores";
const store = useStore();
const state = reactive({
  text: "Hello i'am rongding...",
  assets: store.assets,
  // 获取亲密度
  getIntimacy() {
    getIntimacy();
  },
  // 熊旅行
  travel() {
    Taro.showToast({
      title: "开发中",
      icon: "error",
      duration: 1000,
    });
  },
});
// 获取亲密度
function execSomeThing(type: number) {
  switch (type) {
    case 1: {
      state.travel();
      break;
    }
    default:
      state.travel();
      break;
  }
}
</script>

<template>
  <view class="page-container">
    <NavBar>首页</NavBar>
    <view class="main">
      <view class="operation-bar">
        <image :src="state.assets.icon" alt="" @tap="state.getIntimacy" />
        <image :src="state.assets.icon" alt="" @tap="state.getIntimacy" />
      </view>
      <view class="operation-bar">
        <image :src="state.assets.icon" alt="" @tap="state.travel" />
        <image :src="state.assets.icon" alt="" @tap="state.travel" />
      </view>
      <view class="bear-area">
        <image class="bear" :src="state.assets.bear" alt="" />
        <view class="honeypot" @tap="state.travel"> 蜜罐 </view>
      </view>
      <view class="operation-bar bottom-bar">
        <image
          :src="state.assets.icon"
          alt=""
          @tap="execSomeThing(index)"
          v-for="(item, index) in 5"
          :key="index"
        />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.page-container {
  background-image: url("https://raw.githubusercontent.com/wangrongding/image-house/master/images202202281552325.png");
  background-color: #48c77d;
  // background-size: 100% 100%;
  background-size: 100% auto;
  // background-position: center bottom;
  background-position: center top;
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
      bottom: 300px;
      // display: flex;
      // flex-direction: row;
      // justify-content: center;
      text-align: center;
      .bear {
        width: 280px;
        height: 320px;
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
    }
  }
}
</style>
