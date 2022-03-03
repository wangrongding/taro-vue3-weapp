<template>
  <view class="partner-title"> 每日查看 </view>
  <image class="dailyview-image" :src="state.logo" alt="" />
  <view class="logo-name">
    小白会去探险~
    <view class="name"> 晚上，小白陪你一起入睡，改善你的睡眠 </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
const state = reactive({
  logo: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
});
</script>

<style lang="scss">
.partner-subtitle {
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.dailyview-image {
  margin-top: 210px;
  width: 280px;
  height: 320px;
}
</style>
