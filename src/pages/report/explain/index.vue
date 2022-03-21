<template>
  <view class="page-container">
    <NavBar>梦琦</NavBar>
    <view class="page-main">
      <view class="explain-title"> 睡眠限制 </view>
      <view class="explain-text"> {{ state.text }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
import NavBar from "../../../components/NavBar.vue";
const state = reactive({
  text: "睡眠限制是一种减少你在床时间的技术，你上周平均每晚实际睡6小时，平均在床时间8小时，有2个小时醒着躺在床上，平均睡眠效率为75%，长时间醒着躺在床上会导致睡眠问题。 在睡眠限制中减少你的在床时间（8小时），使之与实际睡眠时间（6小时）尽量接近，",
});
</script>

<style lang="scss">
.page-container {
  background: url("https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452455.png");
  background: rgba(137, 144, 254, 1);
  background-size: 100% auto;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .page-main {
    position: relative;
    height: 100%;
    .explain-title {
      font-size: 22px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
      margin-top: 27px;
    }
    .explain-text {
      font-size: 17px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      text-indent: 30px;
      margin: 15px auto 0 auto;
      width: 335px;
    }
  }
}
</style>
