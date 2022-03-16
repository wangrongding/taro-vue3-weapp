<template>
  <view class="time">
    <picker-view indicator-style="height: 30px;" :value="valueArr" class="picker-view">
      <picker-view-column class="hours">
        <view v-for="(item, index) in state.hours" :key="index">{{ item }}</view>
      </picker-view-column>
      <picker-view-column>
        <view> : </view>
      </picker-view-column>
      <picker-view-column class="minutes">
        <view v-for="(item, index) in state.minutes" :key="index">{{ item }}</view>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
const state = reactive({
  valueArr: [],
  hours: [],
  minutes: [],
  time() {
    for (let i = 0; i <= 23; i++) {
      state.hours.push(i < 10 ? "0" + i : i);
    }

    for (let i = 0; i <= 59; i++) {
      state.minutes.push(i < 10 ? "0" + i : i);
    }
  },
});
// 初始化
state.time();
</script>

<style lang="scss">
.time {
  .picker-view {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    width: 335px;
    height: 200px;
    background: rgba(137, 144, 254, 1);
    margin: 20px auto;
    text-align: center;
    .minutes {
      margin: 0 60px;
    }
    .hours {
      margin: 0 60px;
    }
    // .picker-view {
    //   width: 335px;
    //   height: 200px;
    //   text-align: center;
    //   margin: 60px auto;
    //   color: #fff;
    //   .u-column-item {
    //     padding: 32px 0;
    //   }
  }
}
</style>
