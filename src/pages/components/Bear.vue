<script setup lang="ts">
import { reactive, computed, ComputedRef } from "vue";
import bus from "@/utils/eventBus";
import Taro from "@tarojs/taro";
import { useAssetsStore } from "@/stores/assets";
import { getAnimalAndHoneyInfo, beginAdventure, updateUserAnimalStatus } from "@/api/home";
import { BearAndHoney } from "@/types/index";
const store = useAssetsStore();
const state = reactive({
  file: "page",
  assets: store.assets.home, // 熊旅行
  bearInfo: {} as BearAndHoney["animal"],
  honeyInfo: {} as BearAndHoney["honey"],
  // 获取熊和蜜信息
  getAnimalAndHoneyInfo() {
    getAnimalAndHoneyInfo().then((res: BearAndHoney) => {
      state.bearInfo = res.animal;
      state.honeyInfo = res.honey;
      if (res.animal.animalStatus === 3) {
        Taro.redirectTo({
          url: "/pages/goback/index",
        });
      }
    });
  },
  // 开始冒险
  beginAdventure() {
    beginAdventure({}, { failToast: true, loading: true }).then(() => {
      bus.emit("handlePopupShow", "goout");
      state.getAnimalAndHoneyInfo();
    });
  },
  // 冒险结束 修改动物状态
  updateUserAnimalStatus() {
    updateUserAnimalStatus();
  },
});
// 一个计算属性 ref
const getSize: ComputedRef = computed(() => {
  let systemInfo = {};
  Taro.getSystemInfoAsync({
    success(res) {
      systemInfo = res;
    },
  });
  return systemInfo;
});
// 倒计时
const countdown: ComputedRef = computed(() => {
  if (state.bearInfo.totalTime) {
    // 结束时间
    const endTime =
      new Date(state.bearInfo.outStartTime).getTime() + state.bearInfo.totalTime * 1000;
    return endTime;
  } else {
    return 0;
  }
});

// 暴露出去的获取动物和蜂蜜信息的方法
bus.on("getAnimalAndHoneyInfo", () => {
  state.getAnimalAndHoneyInfo();
});

state.getAnimalAndHoneyInfo();
</script>
<template>
  <view class="main-area">
    <!-- 熊 -->
    <view class="bear-area">
      <!-- <text class="countdown-text">00:50:34</text> -->
      <nut-countdown
        v-if="countdown"
        style="
          justify-content: center;
          font-family: Arial, Helvetica, sans-serif;
          font-weight: bolder;
          font-size: 22px;
          margin-bottom: 20px;
          color: #333333ff;
        "
        :end-time="countdown"
        @on-end="state.getAnimalAndHoneyInfo"
      />
      <image class="bear" :src="state.bearInfo.animalIcon" alt="" />
      <view class="shadow" />
    </view>
    <!-- 蜂蜜 -->
    <view
      class="honeypot"
      @click="state.beginAdventure"
      :style="{
        boxShadow: state.honeyInfo.honeyValue === '30' ? '0px 0px 5px 10px #e5bb3f99' : '',
      }"
    >
      <nut-circleprogress
        :progress="(parseInt(state.honeyInfo.honeyValue) / 30) * 100"
        :is-auto="true"
        stroke-inner-width="4"
        :progress-option="{
          radius: 18 * (getSize.screenWidth / 375),
          backColor: '#FFF',
          progressColor: '#FFD97DFF',
        }"
        style="z-index: 2; position: absolute; top: 0; left: 0; bottom: 0; right: 0"
      />
      <image :src="state.assets.honeypot" class="honey-img" />
      <view class="honey-text"> {{ state.honeyInfo.honeyValue || 0 }}g </view>
    </view>
  </view>
</template>
<style lang="scss">
// 熊区域
.main-area {
  width: 100%;
  position: absolute;
  bottom: 30%;
  text-align: center;
  .bear-area {
    width: 140px;
    margin: auto;
    display: flex;
    flex-direction: column;
    position: relative;
    .countdown-text {
      font-family: Arial, Helvetica, sans-serif;
      font-weight: bolder;
      font-size: 22px;
      margin-bottom: 20px;
      color: #333333ff;
    }
    .bear {
      width: 140px;
      height: 160px;
      position: relative;
      z-index: 2;
    }
    .shadow {
      position: absolute;
      right: 50%;
      bottom: 0px;
      transform: translateX(50%);
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.3);
      z-index: 1;
      width: 100px;
      height: 20px;
    }
  }
  .honeypot {
    position: absolute;
    right: 25px;
    bottom: 25px;
    border-radius: 50%;
    width: 52px;
    height: 52px;
    .honey-img {
      width: 52px;
      height: 52px;
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
    }
    .honey-text {
      font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
      color: white;
      z-index: 2;
      position: absolute;
      right: 50%;
      bottom: -10px;
      font-size: 26px;
      font-weight: bolder;
      transform: translateX(50%);
      -webkit-text-fill-color: white;
      -webkit-text-stroke-color: #804812ff;
      -webkit-text-stroke-width: 2px;
    }
  }
}
</style>
