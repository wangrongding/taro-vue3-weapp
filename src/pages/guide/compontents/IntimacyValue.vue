<template>
  <view>
    <image class="logo-image" :src="state.logo" alt="" />
    <view class="logo-name"> “哦~ {{ state.name }}，你好呀~” </view>
    <view class="intimate-data">
      <image class="intimate-icon" :src="state.logo" alt="" />
      <view class="intimate-name"> +3 亲密值</view>
    </view>
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

<style lang="scss">
.intimate-data {
  width: 335px;
  height: 58px;
  background: #ff9b85;
  border-radius: 15px;
  margin-left: 20px;
  text-align: left;
  line-height: 58px;
  .intimate-icon {
    width: 31px;
    height: 28px;
    margin: 0 20px;
  }
  .intimate-name {
    vertical-align: super;
    display: inline-block;
    font-size: 17px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
