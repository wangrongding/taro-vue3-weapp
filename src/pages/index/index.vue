<script setup lang="ts">
import { reactive } from "vue";
// import Counter from "../../components/Counter.vue";
import Counter from "@/components/Counter.vue";
import "./index.scss";
const state = reactive({
  text: "Hello i'am rongding...",
  assets: {
    icon: "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452915.png",
    bear: "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251441488.png",
    background:
      "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452455.png",
    icon2:
      "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452455.png",
    icon3:
      "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251639035.png",
    icon4:
      "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251641064.png",
  },
});
</script>

<template>
  <view class="page-container">
    <view class="nav-bar">梦奇</view>
    <view class="operation-bar">
      <image :src="state.assets.icon" alt="" />
      <image :src="state.assets.icon" alt="" />
    </view>
    <view class="operation-bar">
      <image :src="state.assets.icon" alt="" />
      <image :src="state.assets.icon" alt="" />
    </view>
    <view class="main">
      <image :src="state.assets.bear" alt="" />
      <text> 蜜罐 </text>
    </view>
    <view class="operation-bar bottom-bar">
      <image :src="state.assets.icon" alt="" />
      <image :src="state.assets.icon3" alt="" />
      <image :src="state.assets.icon4" alt="" />
      <image :src="state.assets.icon" alt="" />
      <image :src="state.assets.icon" alt="" />
    </view>
  </view>
  <!-- <Counter class="counter" /> -->
</template>

<style lang="scss">
.page-container {
  background: url("https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452455.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  .counter {
    width: 200px;
    height: 200px;
  }
  .nav-bar {
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
  .operation-bar {
    // width: 100%;
    padding: 0 42px;
    margin-bottom: 36px;
    display: flex;
    justify-content: space-between;
    image {
      // width: 100px;
      // height: 125px;
      width: 88px;
      height: 104px;
    }
  }
  .main {
    height: 400px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    image {
      display: flex;
      justify-content: center;
      // align-items: center;
      // align-self: center;
      width: 300px;
      height: 400px;
    }
  }
  .bottom-bar {
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    bottom: 0;
    margin-bottom: 330px;
  }
}
</style>
