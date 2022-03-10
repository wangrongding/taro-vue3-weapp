<template>
  <image class="dailylife-image" :src="state.logo" alt="" />
  <view class="logo-name">
    设置你的作息~
    <view class="name"> 让{{ state.name }}跟你一起日出而作，日落而息 </view>
    <view class="time">
      <view class="wake-time work-rest" @tap="state.open(state.wakeTime)"> {{ state.wakeTime }} </view>
      <view class="sack-time work-rest" @tap="state.open(state.sackTime)"> {{ state.sackTime }} </view>
    </view>
  </view>
  <!-- 时间选择器 -->
  <view class="mask" v-show="state.timeShowModel">
    <picker-view
      indicator-style="height: 30px;"
      :value="value"
      @change="state.onChange"
      class="picker-view"
    >
      <view class="title">{{ state.title }}</view>
      <view class="sure-btn" @tap="state.sureBtn(state.title)">确认</view>
      <picker-view-column class="hours">
        <view v-for="(item, index) in hours" :key="index">{{ item < 10 ? "0" + item : item }}</view>
      </picker-view-column>
      <picker-view-column>
        <view> : </view>
      </picker-view-column>
      <picker-view-column class="minutes">
        <view v-for="(item, index) in minutes" :key="index">{{ item < 10 ? "0" + item : item }}</view>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
const date = new Date();
const hours = [];
const minutes = [];
for (let i = 0; i <= 23; i++) {
  hours.push(i);
}
for (let i = 0; i <= 59; i++) {
  minutes.push(i);
}
const state = reactive({
  logo: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
  name: "小白",
  wakeTime: "上床时间",
  sackTime: "起床时间",
  hours: hours,
  hoursData: "",
  minutes: minutes,
  minutesData: "",
  timeShowModel: false,
  title: "",
  // 获取选择时间值
  onChange: function(e) {
    const val = e.detail.value;
    state.hoursData = val[0] < 10 ? "0" + val[0] : val[0];
    state.minutesData = val[2] < 10 ? "0" + val[2] : val[2];
    state.hours = this.hours[val[0]];
    state.minutes = this.minutes[val[2]];
  },
  // 打开时间插件
  open(title) {
    state.title = title;
    state.timeShowModel = true;
  },
  // 点击确认时间
  sureBtn(data) {
    data === "上床时间"
      ? (state.wakeTime = state.hoursData + ":" + state.minutesData)
      : (state.sackTime = state.hoursData + ":" + state.minutesData);
    state.timeShowModel = false;
  },
});
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
    margin-left: 52px;
  }
  .sack-time {
    margin-left: 30px;
  }

  .work-rest {
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
}
.mask {
  width: 100%;
  height: 100vh;
  background: rgba(4, 9, 32, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;

  .picker-view {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    width: 100%;
    height: 265px;
    position: absolute;
    background: #fff;
    z-index: 999;
    bottom: 0;
    border-radius: 15px 15px 0px 0px;
    .minutes {
      margin-right: 80px;
    }
    .title {
      font-size: 17px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #333333;
      padding: 12.5px 0 0 20px;
    }
    .sure-btn {
      font-size: 17px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #60d394;
      position: absolute;
      right: 30px;
      z-index: 99;
      padding-top: 12.5px;
    }
  }
}
</style>
