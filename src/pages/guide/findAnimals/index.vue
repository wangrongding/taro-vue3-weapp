<template>
  <view class="page-container">
    <view class="page-main">
      <view class="page-name">草丛里面有一些声音</view>
      <view @tap="state.jumpTo" class="page-btn"> 继续 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
import "./index.scss";
const state = reactive({
  jumpTo() {
    Taro.redirectTo({
      url: "/pages/guide/guidingProcess/index",
      success() {},
    });
  },
});
</script>
