<template>
  <image class="logo-image" :src="state.logo" alt="" />
  <view class="logo-name">
    {{ state.tips.baby }}
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
});
</script>

<style lang="scss">
.animal-name {
  width: 670px;
  height: 116px;
  background: #ffffff;
  box-shadow: 0px 10px 25px 0px rgba(96, 211, 148, 0.3);
  border-radius: 30px;
  margin: 20px 0 30px 40px;
  font-size: 34px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.intimate-data {
  width: 670px;
  height: 116px;
  background: #ff9b85;
  border-radius: 30px;
  margin: 63px 0 0 40px;
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
