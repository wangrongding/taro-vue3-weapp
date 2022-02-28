<template>
  <view class="page-container">
    {{ state.text }}
    <view @tap="state.jumpTo" class="btn"> 跳转首页 </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
const state = reactive({
  text: "引导页，点击跳首页！",
  jumpTo() {
    Taro.redirectTo({
      url: "/pages/index/index?id=1",
      success() {},
    });
  },
});
</script>

<style lang="scss">
.btn {
  background-color: bisque;
  text-align: center;
  width: 400px;
  height: 400px;
  line-height: 400px;
  margin: 0 auto;
}
</style>
