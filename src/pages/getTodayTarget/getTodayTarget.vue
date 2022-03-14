<template>
  <!-- 今日目标列表 -->
  <view class="today-goal">
    <nut-popup
      position="bottom"
      :style="{ height: '543px', background: 'rgba(240, 247, 244, 1)' }"
      round
      close-on-click-overlay
      closeable
      :visible="props.todayGoalPopup.todayGoalPopup"
      @click-overlay="props.todayGoalPopup.todayGoalPopup = false"
      @click-close-icon="props.todayGoalPopup.todayGoalPopup = false"
    >
      <view class="today-goal-main">
        <!-- 空状态 -->
        <!-- <nut-empty description="今天想做点什么呢？" class="today-goal-empty">
            <template #image>
              <img :src="props.todayGoalPopup.assets.bear" />
            </template>
          </nut-empty> -->
        <!-- 有目标状态 -->
        <view class="today-goal-list">
          <view class="title">
            <image class="title-logo" :src="props.todayGoalPopup.assets.icon" alt="" />
            <view class="title-name"> 睡前2小时避免剧烈运动 </view>
            <view class="today-data">
              5 <image :src="props.todayGoalPopup.assets.icon" alt="" />
            </view>
          </view>
          <view class="operation-btn"> 完成 </view>
          <view class="more-operation"> ... </view>
        </view>
      </view>
      <view class="add-target"> 添加目标 </view>
    </nut-popup>
  </view>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
// const props = defineProps({
//   todayGoalPopup: {
//     type: Object,
//     default() {
//       return {};
//     },
//     required: true,
//   },
// });
const state = reactive({});
</script>
<style lang="scss">
// 今日目标列表
.today-goal {
  position: relative;
  .today-goal-empty {
    margin: 80px 0 0 60px;
  }
  .add-target {
    width: 142px;
    height: 58px;
    background: #60d394;
    border-radius: 15px;
    font-size: 15px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #ffffff;
    line-height: 58px;
    text-align: center;
    margin-top: 90px;
    position: absolute;
    bottom: 30px;
    left: 111.5px;
  }
  .today-goal-main::-webkit-scrollbar {
    width: 0;
  }
  .today-goal-main {
    height: 385px;
    position: absolute;
    overflow-y: scroll;
    left: 20px;
    .today-goal-list:nth-child(1) {
      margin-top: 42px;
    }
    .today-goal-list {
      width: 335px;
      height: 130px;
      background: rgba(224, 235, 230, 1);
      box-shadow: 0px 0px 2px 1px rgba(96, 211, 148, 0.1);
      border-radius: 15px;
      margin: 10px auto 0 auto;

      .title {
        height: 80px;
        border-radius: 15px 15px 0 0;
        background: #fff;
        width: 100%;
        display: flex;
        .title-logo {
          width: 50px;
          height: 50px;
          margin: 15px;
          flex: 2;
        }
        .title-name {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          flex: 8;
          vertical-align: top;
          margin-top: 23px;
        }
        .today-data {
          margin: 41px 31px 0 0;
          font-size: 15px;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #333333;
          image {
            width: 14px;
            height: 18px;
            vertical-align: bottom;
          }
        }
      }
      .operation-btn {
        width: 261px;
        height: 40px;
        background: #ffffff;
        border-radius: 13px;
        margin: 5px 0 5px 15px;
        font-size: 12px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #60d394;
        line-height: 40px;
        text-align: center;
        display: inline-block;
      }
      .more-operation {
        display: inline-block;
        margin-left: 28px;
        font-size: 28px;
        color: rgba(128, 128, 128, 1);
      }
    }
  }
}
</style>
