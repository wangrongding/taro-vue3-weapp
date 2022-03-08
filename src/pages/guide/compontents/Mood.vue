<template>
  <view class="mood-days"> 第 {{ state.mooddays }} 天 </view>
  <image class="dailyview-image" :src="state.logo" alt="" />
  <view class="logo-name">
    早上好!
    <view class="name"> 今天是星期{{ state.week }} </view>
  </view>
  <view class="mood-number">
    +20
    <image class="mood-image" :src="state.logo" alt="" />
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
const state = reactive({
  logo: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
  name: "小白",
  mooddays: 16,
  week: "一",
});
</script>

<style lang="scss">
.mood-days {
  font-size: 44px;
  font-family: PingFang-SC-Bold, PingFang-SC;
  font-weight: bold;
  color: #ffffff;
  padding-top: 64px;
}
.dailyview-image {
  margin: 164px 0 40px 0;
  width: 280px;
  height: 320px;
  background: #fff;
}
.mood-number {
  font-size: 44px;
  font-family: PingFang-SC-Bold, PingFang-SC;
  font-weight: bold;
  color: #ffffff;
  margin-top: 70px;
  .mood-image {
    width: 24px;
    height: 32px;
    background: #fff;
  }
}
</style>
