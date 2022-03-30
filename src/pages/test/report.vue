<template>
  <view class="page-container">
    <NavBar>梦琦</NavBar>
    <view class="page-main">
      <image class="test-logo" :src="state.assets.icon" alt="" />
      <view class="test-report-title">{{ state.getResult.title }}</view>
      <view class="test-report-content">
        <span>{{ state.text }}</span>
        <text class="test-report-socre">{{ state.socre }} 分</text>
      </view>
      <view class="test-report-explain">{{ state.getResult.explain }}</view>
    </view>
    <view class="sleep-btn" @tap="state.close"> 完成 </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import NavBar from "../../components/NavBar.vue";
import { getResult } from "@/api/test/index";
import Taro from "@tarojs/taro";
import { useStore } from "@/stores/assets";
const store = useStore();
const getCurrentInstance = Taro.getCurrentInstance();
const state = reactive({
  interfaceId: "",
  getResult: "",
  socre: "",
  assets: store.assets.home,
  text: "",
  getResultData() {
    state.interfaceId = JSON.parse(getCurrentInstance.router.params.id);
    let params = {
      actionId: state.interfaceId.actionId,
      testQuestionnaireId: state.interfaceId.testQuestionnaireId,
    };
    getResult(params)
      .then((res: any) => {
        state.getResult = res;
        state.socre = state.getResult.content.replace(/[^0-9]/gi, "");
        state.text = state.getResult.content.substring(0, 10);
      });
  },
  close() {
    Taro.redirectTo({
      url: "/pages/index/index",
    });
  },
});
state.getResultData();
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
    flex: 1;
    overflow: auto;
    margin-left: 20px;
    .test-logo {
      width: 75px;
      height: 75px;
      margin: 27px 0 15px 0;
    }
    .test-report-title {
      font-size: 22px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #ffffff;
    }
    .test-report-explain {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      margin-top: 20px;
    }
    .test-report-content {
      font-size: 17px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      margin-top: 5px;
      .test-report-socre {
        color: rgba(255, 155, 133, 1);
        margin-left: 5px;
      }
      span {
        display: inline-block;
      }
    }
  }
  .sleep-btn {
    width: 142px;
    height: 58px;
    line-height: 58px;
    text-align: center;
    border-radius: 15px;
    font-size: 15px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #60d394;
    background: #fff;
    margin: 15px auto 30px auto;
  }
}
</style>
