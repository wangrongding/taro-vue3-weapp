<template>
  <view class="page-container">
    <NavBar>梦琦</NavBar>
    <view class="page-main">
      <nut-progress
        :percentage="100 / (state.sleepList.length / state.next.sort)"
        :show-text="false"
        stroke-color="#fff"
      />
      <view class="title">{{ state.next.sort }} . {{ state.next.title }} </view>
      <view class="test-questions">
        <component
          :is="state.componentList[state.next.questionType - 1]"
          :single-choice-list="state.next"
          :default-value="state.defaultValue"
          @desc="descTime"
          @duration="durationBtn"
          @countNum="countNum"
          @singleChoice="singleChoiceAnswer"
          @multipleChoice="multipleChoiceAnswer"
        />
      </view>
      <view class="test-questions-btn">
        <view class="test-questions-return btn" @tap="preNext"> 返回 </view>
        <view class="test-questions-go btn" @tap="goStart"> 继续 </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, shallowRef } from "vue";
import { getSleepTest, saveResult } from "@/api/sleepDiary/index";
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
  index: 0,
  sleepList: [],
  next: {},
  time: "",
  answerList: [],
  diaryOptionId: [],
  answer: "",
  multipleChoiceAnswer: [],
  // 所有子组件的默认值
  defaultValue: {
    desc: "年-月-日 时-分",
    duration: "0:0",
    countNumber: 0,
    singleChoice: [],
    number: -1,
  },
});
// 获取试题
function getSleepTestList() {
  let params = {
    diaryId: 1,
  };
  getSleepTest(params)
    .then((res: any) => {
      state.sleepList = res;
      // 给页面使用
      state.next = state.sleepList[state.index];
      addSort();
    });
}
// 继续下一题
function goStart() {
  // 1.年月日时分  2. 选择时间时长 3. 次数加减 4. 单选 5. 多选
  switch (state.sleepList[state.index].questionType) {
    case "1": {
      if (state.defaultValue.desc === "年-月-日 时-分") return showToast("请选择时间");
      state.answer = state.defaultValue.desc;
      break;
    }
    case "2": {
      state.answer = state.defaultValue.duration;
      break;
    }
    case "3": {
      state.answer = state.defaultValue.countNumber;
      break;
    }
    case "4": {
      if (state.defaultValue.number === -1) return showToast("请选择答案");
      // 永远都是0
      state.answer = state.defaultValue.singleChoice[0];
      break;
    }
    case "5": {
      if (state.multipleChoiceAnswer.length === 0) return showToast("请选择答案");
      state.diaryOptionId = state.multipleChoiceAnswer;
      break;
    }
  }

  // 判断数据是否存在
  // state.answerList.forEach((item) => {
  //   if (item.diaryQuestionId === state.sleepList[state.index].id) {
  //     //存在就进来
  //     console.log("存在");
  //     item.answer = state.answer;
  //   } else {
  //     console.log("不存在");
  //   }
  // });
  // 后台需要数据格式
  state.answerList.push({
    diaryQuestionId: state.sleepList[state.index].id, // 题干id
    questionType: state.sleepList[state.index].questionType, // 类型
    sort: state.sleepList[state.index].sort, //  顺序
    answer: state.answer, // 答案
    diaryOptionId: state.diaryOptionId, // 多选数组
  });
  // console.log(state.answerList);
  // 恢复默认值
  state.defaultValue.desc = "年-月-日 时-分";
  state.defaultValue.number = -1;
  // 下标+1 获取接口一次性给的题
  state.index = state.index + 1;
  state.next = state.sleepList[state.index];
  // 判断是否跳转报告以及传参接口参数
  if (state.answerList.length === 12) {
    let params = {
      answerList: state.answerList,
      diaryId: 1,
    };
    saveResult(params)
      .then(() => {
      // Taro.redirectTo({
      //   url: "/pages/sleepDiary/report/index",
      //   success() {},
      // });
      });
    return;
  }
}
// 上一题
function preNext() {
  // 判断是否是第一题
  if (state.index === 0) {
    return Taro.redirectTo({
      url: "/pages/sleepDiary/index",
      success() {},
    });
  }
  state.index = state.index - 1;
  state.next = state.sleepList[state.index];
}
// 获取时间选择
function descTime(data: string) {
  state.defaultValue.desc = data;
}
// 获取时长
function durationBtn(data: string) {
  state.defaultValue.duration = data;
}
// 获取计数
function countNum(data: number) {
  state.defaultValue.countNumber = data;
}
// 获取单选题答案
function singleChoiceAnswer(data: string) {
  state.defaultValue.singleChoice = data;
}
// 获取多选题答案
function multipleChoiceAnswer(data: any) {
  state.multipleChoiceAnswer = data;
}
// 转换 字母A，B,C
function addSort() {
  if (state.next.questionType === "4" || state.next.questionType === "5") {
    state.sleepList.forEach((item) => {
      item.optionList.forEach((chiliren) => {
        chiliren.sort === 1
          ? (chiliren.sort = "A")
          : chiliren.sort === 2
            ? (chiliren.sort = "B")
            : chiliren.sort === 3
              ? (chiliren.sort = "C")
              : chiliren.sort === 4
                ? (chiliren.sort = "D")
                : chiliren.sort === 5
                  ? (chiliren.sort = "E")
                  : chiliren.sort === 6
                    ? (chiliren.sort = "F")
                    : chiliren.sort === 7
                      ? (chiliren.sort = "G")
                      : chiliren.sort === 8
                        ? (chiliren.sort = "H")
                        : (chiliren.sort = "I");
      });
    });
  }
}
// 提示
function showToast(data) {
  Taro.showToast({
    title: data,
    icon: "none",
    duration: 1000,
  });
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
      height: 371px;
      overflow-y: scroll;
      margin-top: 20px;
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
