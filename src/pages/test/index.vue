<template>
  <!-- 今日目标列表 -->
  <D-Popup
    position="bottom"
    height="70%"
    :visible="props.visible"
    padding="37px 20px 0"
    :background-color="'rgba(249, 244, 242, 1)'"
    :suffix-color="'rgba(255, 155, 133, 1)'"
    :opened-callback="state.getSleepListData"
  >
    <template #content>
      <view class="test-goal">
        <view
          class="test-goal-list"
          v-for="(item, index) in state.getSleepList"
          :key="index"
          @tap="state.getSleepBtn(item)"
        >
          <image class="test-logo" :src="item.icon" alt="" />
          <view class="test-name">
            <span class="test-list-title">{{ item.title }}</span>
            <span class="test-detail">{{ item.explain }}</span>
          </view>
          <span class="test-energy-val">{{ item.honeyCount }}</span>
          <image class="test-energy-img" :src="state.assets.title" alt="" />
        </view>
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
import { getSleepList } from "@/api/test/index";
const store = useStore();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
});
const state = reactive({
  assets: store.assets.ambient,
  getSleepList: [],
  // 获取列表
  getSleepListData() {
    getSleepList()
      .then((res: any) => {
        state.getSleepList = res;
      });
  },
  getSleepBtn(item) {
    Taro.navigateTo({
      url: "/pages/sleepDiary/index?id=" + item.id,
    });
  },
});
//    --------初始化 ------------
</script>
<style lang="scss">
.logo-image {
  width: 229px;
  height: 80px;
}
.test-goal {
  .test-goal-list {
    width: 335px;
    height: 80px;
    background: #ffffff;
    box-shadow: 0px 0px 2px 1px rgba(96, 211, 148, 0.1);
    border-radius: 15px;
    display: flex;
    margin-top: 10px;
    .test-logo {
      width: 50px;
      height: 50px;
      margin: 15px;
    }
    .test-name {
      flex: 1;
      .test-list-title {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        margin-top: 20px;
      }
      .test-detail {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        margin-top: 5px;
      }
    }
    .test-energy-img {
      width: 14px;
      height: 18px;
      margin: 32px 15px 0 3px;
    }
    .test-energy-val {
      margin-top: 32px;
      font-size: 15px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #333333;
    }
  }
}
</style>
