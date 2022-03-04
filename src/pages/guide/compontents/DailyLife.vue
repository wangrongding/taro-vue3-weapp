<template>
  <image class="dailylife-image" :src="state.logo" alt="" />
  <view class="logo-name">
    设置你的作息~
    <view class="name"> 让{{ state.name }}跟你一起日出而作，日落而息 </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
const state = reactive({
  logo: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
  name: "小白",
});
</script>

<style lang="scss">
.dailylife-image {
  margin: 290px 0 40px 0;
  width: 280px;
  height: 320px;
  background: #fff
}
</style>
