<template>
  <!-- 今日目标列表 -->
  <D-Popup
    position="bottom"
    height="70%"
    :visible="props.todayTarget"
    padding="37px 20px 0"
    :background-color="'#F0F7F4FF'"
    :suffix-color="'#60D394FF'"
    :opened-callback="state.getUserTargetData"
  >
    <template #content>
      <view class="today-goal">
        <view class="today-goal-main">
          <!-- 暂无今日目标 空状态 -->
          <nut-empty
            description="今天想做点什么呢？"
            class="today-goal-empty"
            v-if="state.targetStatus === 2"
          >
            <template #image>
              <img :src="state.assets.bear">
            </template>
          </nut-empty>
          <!-- 完成所有目标 空状态 -->
          <nut-empty
            description="哇哦~你完成了今天所有的目标"
            class="today-goal-empty"
            v-if="state.targetStatus === 1"
          >
            <template #image>
              <img :src="state.assets.bear">
            </template>
          </nut-empty>
          <!-- 有目标状态 -->
          <view v-else>
            <view class="today-goal-list" v-for="(item, index) in state.voList" :key="index">
              <view class="today-title">
                <image class="title-logo" :src="item.icon" alt="" />
                <view class="title-name"> {{ item.targetName }} </view>
                <view class="today-data">
                  {{ item.honeyCount }} <image :src="item.icon" alt="" />
                </view>
              </view>
              <view class="operation-btn" @tap="state.operationBtn(item)"> 完成 </view>
              <view class="more-operation"> ... </view>
            </view>
          </view>
        </view>
        <view class="add-target" @tap="state.addTarget"> 添加目标 </view>
      </view>
    </template>
    <template #title> <image class="logo-image" :src="state.assets.title" alt="" /> </template>
  </D-Popup>
</template>
<script setup lang="ts">
import { reactive, toRef } from "vue";
import Taro from "@tarojs/taro";
import DPopup from "@/components/D-Popup.vue";
import { useStore } from "@/stores/assets";
import { getUserTarget, finishTarget } from "@/api/target/index";
const store = useStore();
const props = defineProps({
  todayTarget: {
    type: Boolean,
    default: false,
  },
});
const state = reactive({
  assets: store.assets.ambient,
  targetStatus: "",
  voList: [],
  closePop() {},
  open() {},
  // 添加目标跳转
  addTarget() {
    Taro.redirectTo({
      url: "../target/index",
      success() {},
    });
  },
  // 完成目标
  operationBtn(data) {
    let params = {
      honeyCount: data.honeyCount,
      userTargetId: data.targetTypeId,
    };
    finishTarget(params);
  },
  // 获取列表
  getUserTargetData() {
    getUserTarget()
      .then((res: any) => {
        state.targetStatus = res.targetStatus;
        state.voList = res.voList;
      });
  },
});
//    --------初始化 ------------
</script>
<style lang="scss">
// 今日目标列表
.today-goal {
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
    margin: 16px auto 0 auto;
  }
  .today-goal-main::-webkit-scrollbar {
    width: 0;
  }
  .today-goal-main {
    height: 325px;
    overflow-y: scroll;
    .today-goal-list {
      width: 335px;
      height: 130px;
      background: rgba(224, 235, 230, 1);
      box-shadow: 0px 0px 2px 1px rgba(96, 211, 148, 0.1);
      border-radius: 15px;
      margin: 10px auto 0 auto;

      .today-title {
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
