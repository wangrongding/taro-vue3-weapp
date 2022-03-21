<template>
  <view class="page-container">
    <NavBar>梦琦</NavBar>
    <view class="page-main">
      <nut-progress percentage="30" :show-text="false" stroke-color="#fff" />
      <view class="title">{{ state.next.sort }} . {{ state.next.title }} </view>
      <view class="test-questions">
        <component
          :is="state.componentList[state.next.questionType - 1]"
          :single-choice-list="state.singleChoiceList"
          @checkTime="checkTime"
          @duration="durationBtn"
          @countNum="countNum"
        />
      </view>
      <view class="test-questions-btn">
        <view class="test-questions-return btn"> 返回 </view>
        <view class="test-questions-go btn" @tap="goStart"> 继续 </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, shallowRef } from "vue";
import { getSleepTest } from "@/api/sleepDiary/index";
import NavBar from "../../../components/NavBar.vue";
import Taro from "@tarojs/taro";
import time from "../compontents/time.vue";
import duration from "../compontents/duration.vue";
import countTimes from "../compontents/countTimes.vue";
import singleChoice from "../compontents/singleChoice.vue";
import multipleChoice from "../compontents/multipleChoice.vue";
const state = reactive({
  componentList: shallowRef([
    time,
    duration,
    countTimes,
    singleChoice,
    multipleChoice,
  ]),
  index: 3,
  singleChoiceList: [
    {
      sort: "A",
      title: "是",
      active: false,
      id: 1,
    },
    {
      sort: "B",
      title: "否",
      active: false,
      id: 2,
    },
  ],
  sleepList: [],
  next: {},
  time: "",
  durationTime: "",
  countNumber: "",
});
// 获取试题
function getSleepTestList() {
  getSleepTest()
    .then((res: any) => {
      state.sleepList = res;
      state.next = state.sleepList[state.index];
    });
}
// 继续下一题
function goStart() {
  // console.log(state.countNumber);
  // state.index = state.index + 1;
  // state.next = state.sleepList[state.index];
  // Taro.redirectTo({
  //   url: "/pages/sleepDiary/report/index",
  //   success() {},
  // });
}
// 获取时间选择
function checkTime(data: string) {
  state.time = data;
}
// 获取时长
function durationBtn(data: string) {
  state.durationTime = data;
}
// 获取计数
function countNum(data: number) {
  // 因前端是从0开始
  data++;
  state.countNumber = data;
}
// -----------  初始化 -----------
getSleepTestList();
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
    // 进度条
    .nut-progress {
      width: 335px;
      margin: 27px auto;
    }
    .nut-progress .nut-progress-outer.nut-progress-base {
      background: #6268d4;
      border-radius: 7.5px;
    }
    .nut-progress .nut-progress-outer .nut-progress-inner {
      border-radius: 7.5px;
    }
    // 标题
    .title {
      font-size: 22px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
    }
    // 做题内容
    .test-questions {
    }
    // 按钮
    .test-questions-btn {
      display: flex;
      position: absolute;
      bottom: 30px;

      .test-questions-return {
        background: rgba(0, 0, 0, 0.2);
        color: #ffffff;
        margin-left: 20px;
      }
      .test-questions-go {
        background: #ffffff;
        color: rgba(96, 211, 148, 1);
        margin-left: 51px;
      }
      .btn {
        width: 142px;
        height: 58px;
        line-height: 58px;
        text-align: center;
        border-radius: 15px;
        font-size: 15px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
      }
    }
  }
}
</style>
