<script setup lang="ts">
import { reactive } from "vue";
import NavBar from "@/components/NavBar.vue";
import Taro from "@tarojs/taro";
import { useStore } from "@/stores";
const store = useStore();
const state = reactive({
  file: "play",
  assets: store.assets.ambient,
  goBack() {
    Taro.navigateBack({
      delta: 1,
    });
  },
  redirectTo() {
    Taro.redirectTo({
      url: "/pages/index/index",
    });
  },
});
</script>
<template>
  <view class="play-container">
    <NavBar>首页</NavBar>
    <view class="operation">
      <view
        @tap="state.redirectTo"
        :style="{
          width: '50px',
          height: '50px',
          backgroundImage: `url(${state.assets.icon})`,
          backgroundSize: '100% 100%',
          borderRadius: '50%',
          overflow: 'hidden',
        }"
      />
      <nut-icon
        name="arrow-down2"
        color="#fff"
        size="24"
        @tap="state.goBack"
        style="height: 50px; width: 50px; line-height: 50px; margin-top: 5px"
      />
    </view>

    <view
      class="music-img"
      :style="{
        backgroundImage: `url(${state.assets.item})`,
        width: '150px',
        height: '150px',
        'border-radius': '50%',
        'background-color': 'white',
        backgroundSize: '100% 100%',
        margin: ' 0 auto',
        'margin-top': '50px',
        border: '10px solid #fff',
      }"
    />
    <view class="play-box">
      <view style="text-align: center; color: white">5:00</view>
      <view class="operations-play">
        <view
          :style="{
            backgroundColor: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundImage: `url(${state.assets.timing})`,
            backgroundSize: '100% 100%',
          }"
        />
        <view
          :style="{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundImage: `url(${state.assets.play})`,
            backgroundSize: '100% 100%',
          }"
        />
        <view :style="{ backgroundColor: 'white', width: '40px', height: '40px' }" />
      </view>
    </view>
  </view>
</template>
<style lang="scss">
.play-container {
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #60d394ff;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;

  .operation {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    height: 100px;
  }
  .play-box {
    width: 335px;
    position: absolute;
    bottom: 40px;
    height: 100px;
    .operations-play {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100px;
      // padding: 0 20px;
      margin: 0 auto;
      box-sizing: border-box;
    }
  }
}
</style>
