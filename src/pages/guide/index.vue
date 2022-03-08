<template>
  <view class="page-container">
    <NavBar style="color:#000">梦琦</NavBar>
    <view class="page-logo">
      <image :src="state.logo" alt="" />
      <view class="logo-name">梦琦</view>
      <view @tap="state.jumpTo" class="page-btn"> 开始旅程 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
import NavBar from "../../components/NavBar.vue";
import "./index.scss";
import { getGuide } from "@/api/guide/index";
const state = reactive({
  logo: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
  jumpTo() {
    Taro.redirectTo({
      url: "/pages/guide/findAnimals/index",
      success() {},
    });
  },
  getGuide(){
    getGuide();
  },
});
getGuide();
</script>
