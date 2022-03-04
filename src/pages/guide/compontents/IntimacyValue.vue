<template>
      <image class="logo-image" :src="state.logo" alt="" />
      <view class="logo-name">
        “哦~ {{state.name}}，你好呀~”
      </view>
      <view class="intimate-data">
        <image class="intimate-icon" :src="state.logo" alt="" />
        <view class="intimate-name"> +3 亲密值</view>
      </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
const state = reactive({
  logo: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
  name: "仙女儿",
});
</script>

<style lang="scss" >
.intimate-data {
  width: 670px;
  height: 116px;
  background: #ff9b85;
  border-radius: 30px;
  margin-left: 40px;
  text-align: left;
  line-height: 116px;
  .intimate-icon {
    width: 62px;
    height: 56px;
    background: #fff;
    margin: 0 40px;
  }
  .intimate-name {
    vertical-align: super;
    display: inline-block;
    font-size: 34px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
