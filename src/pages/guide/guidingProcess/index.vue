<template>
  <view class="page-container">
    <view class="page-main">
      <component
        :is="state.componentList[state.index]"
      />
      <view @tap="state.jumpTo" class="page-btn"> 继续 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, shallowRef } from "vue";
import Taro from "@tarojs/taro";
import "./index.scss";
import AnimalName from "../compontents/AnimalName.vue";
import UserName from "../compontents/UserName.vue";
import IntimacyValue from "../compontents/IntimacyValue.vue";
import Partner from "../compontents/Partner.vue";
import DailyView from "../compontents/DailyView.vue";
import DailyLife from "../compontents/DailyLife.vue";

const state = reactive({
  logo: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
  componentList: shallowRef([
    AnimalName,
    UserName,
    IntimacyValue,
    Partner,
    DailyView,
    DailyLife,
  ]),
  index: 0,
  loveValueId: "5wc9CAYWtzYHFVMViusoItPYGwq3mLqRvVbUHm7_fUw",
  sleepId: "UUnJ96IPTBMQo5YHcdOOuAcdWLbXIf20Erxi5X9iOqY",
  getUpId: "Ap7RDxyC31iflhCPwTTglenb-6edqOYRtzSJ-yS9UtY",
  jumpTo() {
    if (state.index === 5) {
      Taro.getUserProfile({
        lang: "zh_CN",
        desc: "获取你的昵称",
        success: (response) => {
          let serviceArr:Array<string> = [];
          serviceArr.push(state.loveValueId);
          serviceArr.push(state.sleepId);
          serviceArr.push(state.getUpId);
          Taro.requestSubscribeMessage({
            tmplIds: serviceArr,
            success(res) {
            },
            fail(res) {
            },
          });
        },
        fail: () => {
          // 拒绝授权
          return;
        },
      });
      return;
    }
    state.index = state.index + 1;
    // Taro.redirectTo({
    //  url: "/pages/animalName/index",
    //  success() {},
    // });
  },
});
</script>
