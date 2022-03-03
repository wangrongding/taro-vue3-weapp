<template>
  <view class="page-container">
    <view class="page-main">
      <image :src="state.logo" alt="" />
      <view class="logo-name">
        {{ state.tips.baby }}
        <view class="name"> {{ state.tips.name }} </view>
      </view>
      <view @tap="state.jumpTo" class="page-btn"> 继续 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
import "./index.scss";
const state = reactive({
  logo: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
  animalName: true,
  tips: {
    baby: "你收到了一个熊宝宝!",
    name: "给TA取个名字吧～",
  },
  jumpTo() {
    this.tips = {
      baby: "“啊~谢谢你把我放出来~外面好明亮，你是？”",
    };
    // Taro.redirectTo({
    //  url: "/pages/animalName/index",
    //  success() {},
    // });
  },
});
</script>
