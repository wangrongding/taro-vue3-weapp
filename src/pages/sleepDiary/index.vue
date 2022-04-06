<template>
  <view class="page-container">
    <NavBar>梦琦</NavBar>
    <view class="page-main">
      <view>
        <image
          class="close"
          :src="state.assets.common.close"
          alt=""
          @tap="state.close"
        />
      </view>

      <image class="bear" :src="state.assets.bear.expressionless" alt="" />
      <view class="titel"> {{ state.getSleepGuide.title }} </view>
      <view class="detail">
        {{ state.getSleepGuide.explain }}
      </view>
      <view class="energy-data">
        {{ state.getSleepGuide.honeyCount }}
        <image
          class="energy-value-img"
          :src="state.assets.common.honey"
          alt=""
        />
      </view>
      <view class="start-btn" @tap="state.startBtn"> 开始 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import NavBar from "../../components/NavBar.vue";
import { getSleepGuide } from "@/api/sleepDiary/index";
import Taro from "@tarojs/taro";
import { GetSleepGuide } from "@/types/type";
import { useAssetsStore } from "@/stores/assets";
const store = useAssetsStore();
const state = reactive({
  assets: store.assets,
  typeId: "",
  getSleepGuide: {} as GetSleepGuide,
  getSleepGuideData() {
    state.typeId = Taro.getCurrentInstance().router?.params.id as any;
    let params = {
      typeId: state.typeId,
    };
    getSleepGuide(params)
      .then((res: GetSleepGuide) => {
        state.getSleepGuide = res;
      });
  },
  close() {
    Taro.redirectTo({
      url: "/pages/index/index",
    });
  },
  startBtn() {
    Taro.navigateTo({
      url: "/pages/sleepDiary/testQuestions/index?id=" + state.typeId,
    });
  },
});
state.getSleepGuideData();
</script>

<style lang="scss">
.page-container {
  background: url("https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452455.png");
  background: rgba(137, 144, 254, 1);
  background-size: 100% auto;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .page-main {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    .close {
      width: 38px;
      height: 38px;
      margin: 44px 0 0 20px;
    }
    .bear {
      width: 140px;
      height: 160px;
      margin-left: 117.5px;
    }
    .titel {
      font-size: 22px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
      margin-top: 10px;
    }
    .detail {
      font-size: 17px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      width: 335px;
      margin: 15px auto 0 auto;
      text-indent: 25px;
      flex: 1;
    }

    .energy-data {
      margin-bottom: 100px;
      font-size: 22px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #ffffff;
      text-align: center;

      .energy-value-img {
        width: 12px;
        height: 16px;
      }
    }

    .start-btn {
      width: 142px;
      height: 58px;
      line-height: 58px;
      background: #ffffff;
      border-radius: 15px;
      font-size: 15px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #60d394;
      position: absolute;
      bottom: 30px;
      left: 117px;
      text-align: center;
    }
  }
}
</style>
