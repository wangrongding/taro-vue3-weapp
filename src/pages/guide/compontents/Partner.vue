<template>
      <view class="partner-title"> 你的同伴 </view>
      <view class="partner-subtitle"> {{state.name}}会一直在你身边 </view>
      <view class="intimacy-icon" >
        <image :src="state.logo" alt="" />
      </view>
      <image class="partner-image" :src="state.logo" alt="" />
      <view class="logo-name">  {{state.nameContent}} </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
const state = reactive({
  logo: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
  name: "小白",
  nameContent:`通过一些日常活动
  可以增加你们的感情~ `,
});
</script>

<style lang="scss">
.partner-title {
  padding: 172px 0 10px 0;
  font-size: 34px;
  font-family: PingFang-SC-Bold, PingFang-SC;
  font-weight: bold;
  color: #333333;
}
.partner-subtitle {
  font-size: 28px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.intimacy-icon {
  width: 100%;
  margin: 40px auto;

  image {
    width: 67px;
    height: 60px;
    background: #fff;
  }
}
.partner-image {
  margin: 20px 0 40px 0;
  width: 280px;
  height: 320px;
  background: #fff;
}
</style>
