<template>
  <view class="page-container">
    <NavBar>梦琦</NavBar>
    <view class="page-main">
      <component
        :is="state.componentList[state.index]"
        :sleep-mood-list="state.sleepMoodList"
        @animalName="animalNameNum"
        @userName="userName"
        @timeTable="timeTable"
        @moodBtn="moodBtn"
      />
      <view @tap="jumpTo" class="page-btn"> 继续 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, shallowRef } from "vue";
import Taro from "@tarojs/taro";
import "./index.scss";
import {
  saveName,
  saveUserName,
  updateByAnimalId,
  saveRest,
  wxRegistry,
  sleepMood,
  userMood,
} from "@/api/guide/index";
// import { useStore } from "@/stores";
// const store = useStore();

import NavBar from "../../../components/NavBar.vue";

import AnimalName from "../compontents/AnimalName.vue";
import UserName from "../compontents/UserName.vue";
import IntimacyValue from "../compontents/IntimacyValue.vue";
import Partner from "../compontents/Partner.vue";
import DailyView from "../compontents/DailyView.vue";
import DailyLife from "../compontents/DailyLife.vue";
import Mood from "../compontents/Mood.vue";

const state = reactive({
  logo: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
  componentList: shallowRef([
    AnimalName,
    UserName,
    IntimacyValue,
    Partner,
    DailyView,
    DailyLife,
    Mood,
  ]),
  index: 5,
  loveValueId: "5wc9CAYWtzYHFVMViusoItPYGwq3mLqRvVbUHm7_fUw",
  sleepId: "UUnJ96IPTBMQo5YHcdOOuAcdWLbXIf20Erxi5X9iOqY",
  getUpId: "Ap7RDxyC31iflhCPwTTglenb-6edqOYRtzSJ-yS9UtY",
  animalName: "",
  userName: "",
  sleepMoodList: [],
  time: [],
});

// 继续
function jumpTo() {
  switch (state.index) {
    case 0: {
      if (state.animalName === "") return;
      let params = {
        animalName: state.animalName,
        openId: "ok5R45IzRFU3L9kC6fzRgi5ZIZbc",
      };
      saveName(params);
      break;
    }
    case 1: {
      if (state.userName === "") return;
      let params = {
        name: state.userName,
        openId: "ok5R45IzRFU3L9kC6fzRgi5ZIZbc",
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
      )
      {return Taro.showToast({
        title: "请设置作息时间哦",
        icon: "none",
        duration: 1000,
      });}
      let params = {
        sleepTime: state.time[0].title,
        weekTime: state.time[1].title,
      };
      saveRest(params)
        .then((res) => {
          getUserProfile();
          messageNotification();
        });
      break;
    }
  }
  state.index = state.index + 1;
}
// 授权
function getUserProfile() {
  Taro.getUserProfile({
    lang: "zh_CN",
    desc: "获取你的昵称",
    success: (res) => {
      let params = {
        encrypted: res.encryptedData,
        iv: res.iv,
        openId: "ok5R45IzRFU3L9kC6fzRgi5ZIZbc",
      };
      wxRegistry(params);
    },
    fail: () => {
      return;
    },
  });
}
// 消息通知
function messageNotification() {
  let serviceArr: Array<string> = [];
  serviceArr.push(state.loveValueId);
  serviceArr.push(state.sleepId);
  serviceArr.push(state.getUpId);
  Taro.requestSubscribeMessage({
    tmplIds: serviceArr,
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
    week: "二",
    days: "16",
  };
  userMood(params);
}

// 获取心情列表
function sleepMoodListData() {
  sleepMood()
    .then((res) => {
      state.sleepMoodList = res;
    });
}
// ------------------ 初始化 --------
sleepMoodListData();
</script>
