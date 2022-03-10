<template>
  <view>
    <image class="dailylife-image" :src="state.logo" alt="" />
    <view class="logo-name">
      设置你的作息~
      <view class="name"> 让{{ state.name }}跟你一起日出而作，日落而息 </view>
      <view class="time">
        <view
          class="wake-time"
          v-for="(item, index) in state.time"
          :key="index"
          @tap="openTime(item.title)"
        >
          {{ item.title }}
        </view>

        <nut-picker
          :visible="state.show"
          :list-data="listData"
          @confirm="confirm"
          :cancel-text="state.cancelText"
          @close="close"
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import Taro from "@tarojs/taro";
const state = reactive({
  logo: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
  name: "小白",
  time: [
    {
      title: "上床时间",
    },
    {
      title: "起床时间",
    },
  ],
  show: false,
  hours: [],
  minutes: [],
  cancelText: "",
});
const listData = [
  {
    values: state.hours,
    defaultIndex: 0,
  },
  {
    values: ":",
    defaultIndex: 0,
  },
  // 第二列
  {
    values: state.minutes,
    defaultIndex: 0,
  },
];
// 渲染时间列表
function time() {
  for (let i = 0; i <= 23; i++) {
    state.hours.push(i < 10 ? "0" + i : i);
  }
  for (let i = 0; i <= 59; i++) {
    state.minutes.push(i < 10 ? "0" + i : i);
  }
}
const emit = defineEmits(["timeTable"]);
// 确认选择时间
function confirm(res) {
  state.cancelText === "上床时间"
    ? (state.time[0].title = res.join(""))
    : (state.time[1].title = res.join(""));
  emit("timeTable", state.time);
  close();
}
// 打开选择时间器
function openTime(data) {
  state.cancelText = data;
  state.show = true;
}
// 点击蒙版关闭时间选择器
function close() {
  state.show = false;
}
//  -------   初始化  -------
time();
</script>

<style lang="scss">
.dailylife-image {
  margin: 145px 0 20px 0;
  width: 140px;
  height: 160px;
}
.time {
  display: flex;

  .wake-time {
    margin: 0 20px;
    width: 120px;
    height: 50px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    margin-top: 30px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 50px;
  }
  .wake-time:nth-child(1) {
    margin-left: 52px;
  }
  .nut-picker-item {
    opacity: 0;
  }
  .nut-picker__button {
    font-size: 17px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #60d394;
  }
  .nut-picker__left {
    font-size: 17px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #333333;
  }
}
</style>
