<template>
  <view class="time">
    <picker-view
      indicator-style="height: 80px;"
      :value="valueArr"
      class="picker-view"
      mask-style="opacity: 0;"
      style="line-height: 80px"
      @change="state.durationAnswer"
    >
      <picker-view-column class="hours">
        <view v-for="(item, index) in state.hours" :key="index">{{ item }}小时</view>
      </picker-view-column>
      <picker-view-column>
        <view> : </view>
      </picker-view-column>
      <picker-view-column class="minutes">
        <view v-for="(item, index) in state.minutes" :key="index">{{ item }}分钟</view>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
const emit = defineEmits(["duration"]);
const state = reactive({
  valueArr: [],
  hours: [],
  minutes: [],
  duration: "",
  time() {
    for (let i = 0; i <= 23; i++) {
      state.hours.push(i < 10 ? "0" + i : i);
    }

    for (let i = 0; i <= 59; i++) {
      state.minutes.push(i < 10 ? "0" + i : i);
    }
  },
  durationAnswer(e) {
    // e.detail.value[0] = e.detail.value[0] ? "0" + e.detail.value[0] : e.detail.value[0];
    // e.detail.value[2] = e.detail.value[2] ? "0" + e.detail.value[2] : e.detail.value[2];
    state.duration = e.detail.value[0] + " : " + e.detail.value[2];
    emit("duration", state.duration);
  },
});
// 初始化
state.time();
</script>

<style lang="scss">
.time {
  .picker-view {
    font-size: 20px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #fff;
    width: 335px;
    height: 200px;
    background: rgba(137, 144, 254, 1);
    margin: 80px auto 0 auto;
    text-align: center;
  }
}
</style>
