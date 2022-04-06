<template>
  <view>
    <view class="mood-days"> 第 {{ props.getUserMoodList.days }} 天 </view>
    <image class="mood-image" :src="props.assets.bear.hello" alt="" />
    <view class="logo-name">
      {{ props.getUserMoodList.userName }}好!
      <view class="name"> 今天是星期{{ props.getUserMoodList.week }} </view>
    </view>
    <view class="mood-number">
      +20
      <image class="mood-icon" :src="props.assets.common.honey" alt="" />
    </view>
    <view class="mood-data">
      <view class="mood-title"> 你现在心情怎么样?</view>
      <image
        v-for="(item, index) in (props.sleepMoodList as Sleepmood[])"
        class="mood-logo"
        :key="index"
        :src="item.icon"
        @tap="moodBtn(item)"
        alt=""
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { Sleepmood } from "@/types/type";
const props = defineProps({
  sleepMoodList: {
    type: Array,
    default() {
      return [];
    },
    required: true,
  },
  getUserMoodList: {
    type: Object,
    default() {
      return {};
    },
    required: true,
  },
  assets: {
    type: Object,
    default() {
      return {};
    },
    required: true,
  },
});
const emit = defineEmits(["moodBtn"]);
// 获取点击详情
function moodBtn(data: unknown) {
  emit("moodBtn", data);
}
</script>

<style lang="scss">
.mood-days {
  font-size: 22px;
  font-family: PingFang-SC-Bold, PingFang-SC;
  font-weight: bold;
  color: #ffffff;
  padding-top: 32px;
}
.mood-image {
  margin: 82px 0 20px 0;
  width: 140px;
  height: 160px;
}
.mood-number {
  font-size: 22px;
  font-family: PingFang-SC-Bold, PingFang-SC;
  font-weight: bold;
  color: #ffffff;
  .mood-icon {
    width: 12px;
    height: 16px;
  }
}
.mood-data {
  width: 375px;
  height: 144px;
  background: #ffffff;
  border-radius: 15px 15px 0px 0px;
  position: absolute;
  bottom: 0;
  z-index: 99;
  .mood-title {
    font-size: 17px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #333333;
    margin-top: 15px;
  }
  .mood-logo {
    width: 40px;
    height: 40px;
    margin: 25px 14.25px;
  }
}
</style>
