<template>
  <view class="page-container">
    <view class="page-main">
      {{ state.index }}
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

const state = reactive({
  logo: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
  componentList: shallowRef([
    AnimalName,
    UserName,
    IntimacyValue,
    Partner,
    DailyView,
  ]),
  index: 0,
  jumpTo() {
    // Taro.redirectTo({
    //  url: "/pages/animalName/index",
    //  success() {},
    // });
  },
});
</script>
