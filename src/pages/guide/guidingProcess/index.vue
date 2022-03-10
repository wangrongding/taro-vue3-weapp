<template>
  <view class="page-container">
    <NavBar>梦琦</NavBar>
    <view class="page-main">
      <component
        :is="state.componentList[state.index]"
        @animalName="animalNameNum"
        @userName="userName"
      />
      <view @tap="state.jumpTo" class="page-btn"> 继续 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, shallowRef } from "vue";
import Taro from "@tarojs/taro";
import "./index.scss";
import { saveName, saveUserName, updateByAnimalId, wxRegistry } from "@/api/guide/index";
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
  index: 4,
  loveValueId: "5wc9CAYWtzYHFVMViusoItPYGwq3mLqRvVbUHm7_fUw",
  sleepId: "UUnJ96IPTBMQo5YHcdOOuAcdWLbXIf20Erxi5X9iOqY",
  getUpId: "Ap7RDxyC31iflhCPwTTglenb-6edqOYRtzSJ-yS9UtY",
  animalName: "",
  userName: "",
  jumpTo() {
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
        let fun = async () => {
          await getUserProfile;
          let serviceArr: Array<string> = [];
          serviceArr.push(state.loveValueId);
          serviceArr.push(state.sleepId);
          serviceArr.push(state.getUpId);
          Taro.requestSubscribeMessage({
            tmplIds: serviceArr,
            success() {},
            fail() {},
          });
        };
        break;
      }
    }
    state.index = state.index + 1;
  },
});
function getUserProfile() {
  return new Promise((reslove, reject) => {
    Taro.getUserProfile({
      lang: "zh_CN",
      desc: "获取你的昵称",
      success: () => {
        reslove();
      },
      fail: () => {
        return;
      },
    });
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
</script>
