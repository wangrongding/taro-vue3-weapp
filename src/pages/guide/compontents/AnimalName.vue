<template>
      <image class="logo-image" :src="state.logo" alt="" />
      <view class="logo-name">
        你收到了一个熊宝宝!
        <view class="name"> 给TA取个名字吧～ </view>
      </view>
      <input class="animal-name" type="text" maxlength="10"/>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
const state = reactive({
  logo:"https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
});
</script>

<style lang="scss">
.animal-name{
  width: 670px;
  height: 116px;
  background: #FFFFFF;
  box-shadow: 0px 10px 25px 0px rgba(96, 211, 148, 0.3);
  border-radius: 30px;
  margin: 20px 0 30px 40px;
  font-size: 34px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
</style>
