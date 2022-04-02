<template>
  <view class="page-container">
    <NavBar>梦琦</NavBar>
    <view class="page-main">
      <view class="explain-title"> {{ state.getDiaryLimit.title }} </view>
      <view class="explain-text"> {{ state.getDiaryLimit.content }}</view>
    </view>
    <view class="close">
      <image :src="state.assets.icon" alt="" @tap="state.close" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
import { getDiaryLimit } from "@/api/report/index";
import NavBar from "../../../components/NavBar.vue";
import { useAssetsStore } from "@/stores/assets";
import { GetPrivacyPolicy } from "@/types/type";
const store = useAssetsStore();
const state = reactive({
  getDiaryLimit: {} as GetPrivacyPolicy,
  assets: store.assets.home,
  getDiaryLimittData() {
    getDiaryLimit()
      .then((res: GetPrivacyPolicy) => {
        state.getDiaryLimit = res;
      });
  },
  close(){
    Taro.navigateTo({
      url: "/pages/report/index",
    });
  },
});
state.getDiaryLimittData();
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
    margin: 0 auto;
    padding-bottom: 30px;
    .explain-title {
      font-size: 22px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #ffffff;
      text-align: center;
      margin-top: 27px;
    }
    .explain-text {
      font-size: 17px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      text-indent: 30px;
      margin: 15px auto 0 auto;
      width: 335px;
    }
  }
  .close {
    width: 100%;
    text-align: center;
    margin: 15px auto 30px auto;
    image {
      width: 50px;
      height: 58px;
    }
  }
}
</style>
