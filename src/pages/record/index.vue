<template>
  <view class="page-container">
    <NavBar style="color: #000">梦琦</NavBar>
    <view class="page-main">
      <view class="record-title">
        <image
          class="pre"
          :src="state.assets.icon"
          alt=""
          @tap="state.preNext"
        />
        <span class="title-content">{{ state.newDate }}</span>
        <image
          class="next"
          :src="state.currentDate === 0 ? state.assets.icon : state.assets.icon"
          alt=""
          @tap="state.next(state.newDate)"
        />
      </view>
      <view class="record-content">
        <view class="title-target">目标</view>
        <nut-empty description="暂无记录哦~" v-if="state.userTargetRecordList.length === 0">
          <template #image>
            <img :src="state.assets.bear">
          </template>
        </nut-empty>
        <view
          class="recordList"
          v-for="(item, index) in state.userTargetRecordList"
          :key="index"
          v-else
        >
          <image class="recordListImg" :src="item.icon" alt="" />
          <span class="text">{{ item.targetName }}</span>
          <image
            class="complete"
            :src="state.assets.icon"
            alt=""
            v-if="item.finishStatus === 0"
          />
        </view>
      </view>
      <view class="close">
        <image :src="state.assets.icon" alt="" @tap="state.close" />
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
import NavBar from "../../components/NavBar.vue";
import { useStore } from "@/stores/assets";
import { userTargetRecordList } from "@/api/record/index";
const store = useStore();
const state = reactive({
  assets: store.assets.home,
  date: "",
  newDate: "",
  userTargetRecordList: [],
  currentDate: 0,
  // 列表数据
  userTargetRecordListData(date) {
    time(date);
    let params = {
      time: state.date,
    };
    userTargetRecordList(params)
      .then((res: any) => {
        state.userTargetRecordList = res.userTargetRecordList;
        state.newDate = res.time;
      });
  },
  // 关闭
  close() {
    Taro.redirectTo({
      url: "/pages/index/index",
      success() {},
    });
  },
  // 前一天
  preNext() {
    state.currentDate = state.currentDate - 1;
    state.userTargetRecordListData(state.currentDate);
  },
  // 后一天
  next() {
    if (state.currentDate === 0) return;
    state.currentDate = state.currentDate + 1;
    state.userTargetRecordListData(state.currentDate);
  },
});
// 获取当前时间、根据选择切换获取日期
function time(newTime) {
  let newDate = new Date();
  newDate.setDate(newDate.getDate() + newTime);
  let year = newDate.getFullYear();
  let mounth =
    newDate.getMonth() + 1 < 10 ? "0" + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
  let date = newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
  return (state.date = year + "-" + mounth + "-" + date);
}
// 初始化 记录列表 0默认时间是当前时间
state.userTargetRecordListData(0);
</script>

<style lang="scss">
.page-container {
  background: rgba(243, 245, 249, 1);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .page-main {
    position: relative;
    height: 100%;
    .record-title {
      display: flex;
      margin-top: 27px;
      image {
        width: 30px;
        height: 30px;
        background: red;
      }
      .pre {
        margin-left: 20px;
      }
      .next {
        margin-right: 20px;
      }
      .title-content {
        font-size: 22px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #333333;
        flex: 1;
        text-align: center;
      }
    }
    .record-content {
      width: 335px;
      height: 437px;
      overflow-y: scroll;
      background: #ffffff;
      box-shadow: 0px 0px 2px 1px rgba(96, 211, 148, 0.1);
      border-radius: 15px 15px 0px 0px;
      margin: 15px auto 0 auto;
      .title-target {
        font-size: 17px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #333333;
        margin: 15px;
      }
      .recordList {
        position: relative;
        margin-top: 20px;
        .recordListImg {
          width: 40px;
          height: 40px;
          margin-left: 25px;
        }
        .complete {
          width: 10px;
          height: 10px;
          position: absolute;
          bottom: 5px;
          left: 55px;
        }
        .text {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          margin-left: 15px;
          width: 230px;
          display: inline-block;
          vertical-align: top;
          margin-top: 10px;
        }
      }
    }
    .close {
      width: 100%;
      text-align: center;
      margin-top: 15px;
      image {
        width: 50px;
        height: 58px;
      }
    }
  }
}
</style>
