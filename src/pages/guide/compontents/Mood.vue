<template>
  <view class="mood-days"> 第 {{ state.mooddays }} 天 </view>
  <image class="mood-image" :src="state.logo" alt="" />
  <view class="logo-name">
    早上好!
    <view class="name"> 今天是星期{{ state.week }} </view>
  </view>
  <view class="mood-number">
    +20
    <image class="mood-icon" :src="state.logo" alt="" />
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
const state = reactive({
  logo: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
  name: "小白",
  mooddays: 16,
  week: "二",
});
</script>

<style lang="scss">
.mood-days {
  font-size: 22px;
  font-family: PingFang-SC-Bold, PingFang-SC;
  font-weight: bold;
  color: #ffffff;
  padding-top: 32px;
}
.mood-image {
  margin: 82px 0 20px 0;
  width: 140px;
  height: 160px;
}
.mood-number {
  font-size: 22px;
  font-family: PingFang-SC-Bold, PingFang-SC;
  font-weight: bold;
  color: #ffffff;
  .mood-icon {
    width: 12px;
    height: 16px;
  }
}
</style>
