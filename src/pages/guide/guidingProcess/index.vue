<template>
  <view class="page-container">
    <NavBar>梦琦</NavBar>
    <view class="page-main">
      <view class="elastic-box">
        <component
          :is="state.componentList[state.index]"
          :sleep-mood-list="state.sleepMoodList"
          :get-user-mood-list="state.getUserMoodList"
          :user-name="state.userName"
          :animal-name="state.animalName"
          @animalName="animalNameNum"
          @userName="userName"
          @timeTable="timeTable"
          @moodBtn="moodBtn"
        />
      </view>

      <view @tap="jumpTo" class="page-btn"> 继续 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, shallowRef } from "vue";
import Taro from "@tarojs/taro";
import {
  saveName,
  saveUserName,
  updateByAnimalId,
  saveRest,
  wxRegistry,
  sleepMood,
  userMood,
  getUserMood,
  template,
} from "@/api/guide/index";
import { useStore } from "@/stores";
const store = useStore();

import NavBar from "../../../components/NavBar.vue";

import AnimalName from "../compontents/AnimalName.vue";
import UserName from "../compontents/UserName.vue";
import IntimacyValue from "../compontents/IntimacyValue.vue";
import Partner from "../compontents/Partner.vue";
import DailyView from "../compontents/DailyView.vue";
import DailyLife from "../compontents/DailyLife.vue";
import Mood from "../compontents/Mood.vue";
const getCurrentInstance = Taro.getCurrentInstance();

const state = reactive({
  index: 0,
  componentList: shallowRef([
    AnimalName,
    UserName,
    IntimacyValue,
    Partner,
    DailyView,
    DailyLife,
    Mood,
  ]),
  loveValueId: "5wc9CAYWtzYHFVMViusoItPYGwq3mLqRvVbUHm7_fUw",
  sleepId: "UUnJ96IPTBMQo5YHcdOOuAcdWLbXIf20Erxi5X9iOqY",
  getUpId: "Ap7RDxyC31iflhCPwTTglenb-6edqOYRtzSJ-yS9UtY",
  animalName: "",
  userName: "",
  sleepMoodList: [],
  getUserMoodList: [],
  time: [],
  serviceArr: [],
});

// 继续
function jumpTo() {
  switch (state.index) {
    case 0: {
      if (state.animalName === "") return;
      let params = {
        animalName: state.animalName,
      };
      saveName(params);
      break;
    }
    case 1: {
      if (state.userName === "") return;
      let params = {
        name: state.userName,
      };
      saveUserName(params);
      break;
    }
    case 2: {
      let params = {
        intimateValue: 3,
      };
      updateByAnimalId(params);
      break;
    }
    case 5: {
      if (
        state.time.length === 0 ||
        state.time[0].title === "上床时间" ||
        state.time[1].title === "起床时间"
      ) {
        return Taro.showToast({
          title: "请设置作息时间哦",
          icon: "none",
          duration: 1000,
        });
      }
      let params = {
        sleepTime: state.time[0].title,
        weekTime: state.time[1].title,
      };
      saveRest(params)
        .then(() => {
          sleepMoodListData();
          getUserMoodData();
          templateList();
        });

      break;
    }
  }
  state.index = state.index + 1;
}
// 消息通知
function messageNotification() {
  let serviceArrs: Array<string> = [];
  serviceArrs.push(state.serviceArr[0]);
  serviceArrs.push(state.serviceArr[1]);
  serviceArrs.push(state.serviceArr[2]);
  Taro.requestSubscribeMessage({
    tmplIds: serviceArrs,
    success() {},
    fail() {},
  });
}

// 获取动物名字
function animalNameNum(num: string) {
  state.animalName = num;
}
// 获取用户名字
function userName(num: string) {
  state.userName = num;
}

// 设置作息时间
function timeTable(data: string) {
  state.time = data;
}
// 选择心情
function moodBtn(data: any) {
  let params = {
    moodId: data.id,
    week: state.getUserMoodList.week,
    days: state.getUserMoodList.days,
  };
  userMood(params)
    .then(() => {
      Taro.redirectTo({
        url: "/pages/index/index",
        success() {},
      });
    });
}

// 获取心情列表
function sleepMoodListData() {
  sleepMood()
    .then((res) => {
      state.sleepMoodList = res;
    });
}
// 心情详情
function getUserMoodData() {
  getUserMood()
    .then((res) => {
      state.getUserMoodList = res;
    });
}
// 消息通知模板
function templateList() {
  template()
    .then((res) => {
      res.forEach((item) => {
        state.serviceArr.push(item.templateId);
        messageNotification();
      });
    });
}
function start() {
  state.index = Number(getCurrentInstance.router.params.index);
  if (state.index === 6) {
    sleepMoodListData();
    getUserMoodData();
  }
}
// 初始化
start();
</script>
<style lang="scss">
.page-container {
  text-align: center;
  margin: 0 auto;
  background-color: #60d394;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .page-main {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    .elastic-box {
      flex: 1;
      .logo-image {
        margin: 22px 0 15px 0;
        width: 105px;
        height: 120px;
      }

      .logo-name {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 20px;
        height: 42px;
        margin-bottom: 10px;
        white-space: pre-wrap;
      }

      .animal-name {
        width: 336px;
        height: 58px;
        background: #ffffff;
        box-shadow: 0px 5px 12.5px 0px rgba(96, 211, 148, 0.3);
        border-radius: 15px;
        margin-left: 20px;
        font-size: 17px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
      }
    }

    .page-btn {
      width: 142px;
      height: 58px;
      background: #ffffff;
      border-radius: 15px;
      font-size: 15px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #60d394;
      line-height: 58px;
      margin: 0 auto 50px auto;
      text-align: center;
    }
  }
}
</style>
