<template>
  <view class="page-container">
    <NavBar>梦琦</NavBar>
    <nut-progress
      :percentage="100 / (state.sleepList.length / state.next.sort)"
      :show-text="false"
      stroke-color="#fff"
    />
    <view class="title">{{ state.next.sort }} . {{ state.next.title }} </view>
    <view class="page-main">
      <view class="test-questions">
        <component
          :is="state.componentList[Number(state.next.questionType) - 1]"
          :single-choice-list="state.next"
          :default-value="state.defaultValue"
          @desc="descTime"
          @duration="durationBtn"
          @countNum="countNum"
          @singleChoice="singleChoiceAnswer"
          @multipleChoice="multipleChoiceAnswer"
        />
      </view>
    </view>
    <view class="test-questions-btn">
      <view class="test-questions-return btn" @tap="preNext"> 返回 </view>
      <view class="test-questions-go btn" @tap="goStart"> 继续 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, shallowRef } from "vue";
import { getDiaryTest, saveResult, getSleepTest, saveTestResult } from "@/api/sleepDiary/index";
import NavBar from "../../../components/NavBar.vue";
import Taro from "@tarojs/taro";
import time from "../compontents/time.vue";
import duration from "../compontents/duration.vue";
import countTimes from "../compontents/countTimes.vue";
import singleChoice from "../compontents/singleChoice.vue";
import multipleChoice from "../compontents/multipleChoice.vue";
import { Gettest } from "@/types/type";
interface Answer {
  diaryQuestionId: string;
  questionType: string;
  answer: any;
  sort: number;
  diaryOptionId: any;
}
const state = reactive({
  componentList: shallowRef([
    time,
    duration,
    countTimes,
    singleChoice,
    multipleChoice,
  ]),
  index: 0,
  sleepList: [] as Gettest[],
  next: {} as Gettest,
  time: "",
  answerList: [] as Answer[],
  diaryOptionId: [],
  answer: "" as any,
  multipleChoiceAnswer: [],
  // 所有子组件的默认值
  defaultValue: {
    desc: "年-月-日 时-分",
    duration: "0:0",
    countNumber: 0,
    singleChoice: "",
    number: -1,
  },
  typeId: "",
  answerObj: {},
});
// 获取试题
function getSleepTestList() {
  // 4是睡眠日记  其他是 测试列表
  state.typeId = Taro.getCurrentInstance().router?.params.id as any;
  if (state.typeId === "4") {
    let params = {
      diaryId: 1,
    };
    getDiaryTest(params).then((res: Gettest[]) => {
      state.sleepList = res;
      // 给页面使用
      state.next = state.sleepList[state.index];
      addSort();
    });
  } else {
    let params = {
      diaryId: state.typeId,
    };
    getSleepTest(params).then((res: Gettest[]) => {
      state.sleepList = res;
      // 给页面使用
      state.next = state.sleepList[state.index];
      addSort();
    });
  }
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
      state.answer = state.defaultValue.singleChoice;
      break;
    }
    case "5": {
      if (state.multipleChoiceAnswer.length === 0) return showToast("请选择答案");
      state.diaryOptionId = state.multipleChoiceAnswer;
      break;
    }
  }

  // 判断数据是否存在  answerObj
  state.answerObj[state.sleepList[state.index].id] = {
    diaryQuestionId: state.sleepList[state.index].id,
    questionType: state.sleepList[state.index].questionType, // 类型
    answer: state.answer, // 答案
    sort: state.sleepList[state.index].sort, //  顺序
    diaryOptionId: state.diaryOptionId, // 多选数组
  };
  // 后台需要数据格式
  state.answerList = [];
  for (let i in state.answerObj) {
    state.answerList.push(state.answerObj[i]);
  }
  // 恢复默认值
  state.defaultValue.desc = "年-月-日 时-分";
  state.defaultValue.number = -1;
  // 下标+1 获取接口一次性给的题
  state.index = state.index + 1;
  state.next = state.sleepList[state.index];
  // 判断是否跳转报告以及传参接口参数
  if (state.answerList.length === state.sleepList.length) {
    // 4是睡眠日记  其他是 测试列表
    if (state.typeId === "4") {
      let params = {
        answerList: state.answerList,
        diaryId: 1,
      };
      saveResult(params, { failToast: true, loading: true }).then(() => {
        Taro.redirectTo({
          url: "/pages/report/index?name=sleepTest",
        });
      });
    } else {
      let params = {
        answerList: state.answerList,
        diaryId: state.typeId,
      };
      saveTestResult(params, { failToast: true, loading: true }).then((res) => {
        Taro.redirectTo({
          url: "/pages/test/report?id=" + JSON.stringify(res),
        });
      });
    }
    return;
  }
}
// 上一题
function preNext() {
  // 判断是否是第一题
  if (state.index === 0) {
    return Taro.redirectTo({
      url: "/pages/sleepDiary/index?id=" + state.typeId,
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
function singleChoiceAnswer(data: string[]) {
  state.defaultValue.singleChoice = data[0];
}
// 获取多选题答案
function multipleChoiceAnswer(data: never[]) {
  state.multipleChoiceAnswer = data;
}
// 转换 字母A，B,C
function addSort() {
  state.sleepList.forEach((item: any) => {
    item.optionList.forEach((children: { sort: string | number }) => {
      children.sort === 1
        ? (children.sort = "A")
        : children.sort === 2
          ? (children.sort = "B")
          : children.sort === 3
            ? (children.sort = "C")
            : children.sort === 4
              ? (children.sort = "D")
              : children.sort === 5
                ? (children.sort = "E")
                : children.sort === 6
                  ? (children.sort = "F")
                  : children.sort === 7
                    ? (children.sort = "G")
                    : children.sort === 8
                      ? (children.sort = "H")
                      : (children.sort = "I");
    });
  });
}
// 提示
function showToast(data: string) {
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
  // 标题
  .title {
    font-size: 22px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
  }
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
  .page-main {
    position: relative;
    height: 100%;
    flex: 1;
    overflow: auto;
    margin: 0 auto;
    // 做题内容
    .test-questions {
      margin-top: 20px;
    }
  }
  // 按钮
  .test-questions-btn {
    display: flex;
    margin: 15px auto 30px auto;

    .test-questions-return {
      background: rgba(0, 0, 0, 0.2);
      color: #ffffff;
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
</style>
