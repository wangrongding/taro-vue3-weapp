<template>
  <view class="page-container">
    <NavBar style="color: #000" />
    <view class="page-main">
      <MoodLineEcharts :mood-statistics="state.moodStatistics" v-if="state.flag === true" />
      <SleepLineEcharts
        :sleep-efficiency-statistics="state.sleepEfficiencyStatistics"
        v-if="state.flag === true"
      />
      <SleepTimeEcharts
        :sleep-time-statistics="state.sleepTimeStatistics"
        v-if="state.flag === true"
      />
      <InBedTimeEcharts :bed-time-statistics="state.bedTimeStatistics" v-if="state.flag === true" />
      <BedTimeEcharts :on-time-statistics="state.onTimeStatistics" v-if="state.flag === true" />
      <UpTimeEcharts :up-time-statistics="state.upTimeStatistics" v-if="state.flag === true" />
    </view>
    <view class="close">
      <image :src="state.assets.close" alt="" @tap="state.close" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import NavBar from "@/components/NavBar.vue";
import MoodLineEcharts from "./compontents/MoodLineEcharts.vue";
import SleepLineEcharts from "./compontents/SleepLineEcharts.vue";
import SleepTimeEcharts from "./compontents/SleepTimeEcharts.vue";
import InBedTimeEcharts from "./compontents/InBedTimeEcharts.vue";
import BedTimeEcharts from "./compontents/BedTimeEcharts.vue";
import UpTimeEcharts from "./compontents/UpTimeEcharts.vue";

import Taro from "@tarojs/taro";
import {
  moodStatistics,
  sleepEfficiencyStatistics,
  sleepTimeStatistics,
  bedTimeStatistics,
  onTimeStatistics,
  upTimeStatistics,
} from "@/api/dashboard/index";
import { useAssetsStore } from "@/stores/assets";
const store = useAssetsStore();
const state = reactive({
  assets: store.assets.common,
  sleepEfficiencyStatistics: {},
  moodStatistics: {},
  sleepTimeStatistics: {},
  bedTimeStatistics: {},
  onTimeStatistics: {},
  upTimeStatistics: {},
  flag: false,
  // 心情
  moodStatisticsData() {
    moodStatistics({}, { failToast: true, loading: true }).then((res: any) => {
      state.moodStatistics = res;
      state.moodStatistics.title = "心情";
      state.moodStatistics.symbol = "";
    });
  },
  // 睡眠效率
  sleepEfficiencyStatisticsData() {
    sleepEfficiencyStatistics({}, { failToast: true, loading: true }).then((res: any) => {
      state.sleepEfficiencyStatistics = res;
      state.sleepEfficiencyStatistics.title = "睡眠效率";
      state.sleepEfficiencyStatistics.symbol = "%";
    });
  },
  // 睡眠时长
  sleepTimeStatisticsData() {
    sleepTimeStatistics({}, { failToast: true, loading: true }).then((res: any) => {
      state.sleepTimeStatistics = res;
      state.sleepTimeStatistics.title = "睡眠时长";
    });
  },
  // 在床时间
  bedTimeStatisticsData() {
    bedTimeStatistics({}, { failToast: true, loading: true }).then((res: any) => {
      state.bedTimeStatistics = res;
      state.bedTimeStatistics.title = "在床时间";
    });
  },
  // 上床时间
  onTimeStatisticsData() {
    onTimeStatistics({}, { failToast: true, loading: true }).then((res: any) => {
      state.onTimeStatistics = res;
      state.onTimeStatistics.title = "上床时间";
    });
  },
  // 起床时间
  upTimeStatisticsData(){
    upTimeStatistics({}, { failToast: true, loading: true }).then((res: any) => {
      state.upTimeStatistics = res;
      state.upTimeStatistics.title = "起床时间";
      // 判断是否加载完数据
      state.flag = true;
    });
  },
  close() {
    Taro.redirectTo({
      url: "/pages/index/index",
      success() {},
    });
  },
});
onMounted(() => {
  state.moodStatisticsData();
  state.sleepEfficiencyStatisticsData();
  state.sleepTimeStatisticsData();
  state.bedTimeStatisticsData();
  state.onTimeStatisticsData();
  state.upTimeStatisticsData();
});
</script>

<style lang="scss">
.page-container {
  background: rgba(243, 245, 249, 1);
  // height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  // overflow: auto;
  .page-main {
    position: relative;
    // height: 100%;
    flex: 1;
    // overflow: auto;
    margin: 27px auto;
  }
  // 关闭按钮
  .close {
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
    image {
      width: 58px;
      height: 58px;
    }
  }
}
</style>
