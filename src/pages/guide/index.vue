<template>
  <view class="page-container">
    <NavBar style="color: #000">梦琦</NavBar>
    <view class="page-logo">
      <image :src="state.logo" alt="" />
      <view class="logo-name">梦琦</view>
      <view @tap="state.jumpTo" class="page-btn"> 开始旅程 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
import NavBar from "../../components/NavBar.vue";
import { getGuide } from "@/api/guide/index";
// import { useAssetsStore } from "@/stores/assets";
import { useStore } from "@/stores";
// const store = useAssetsStore();
const usestore = useStore();
interface Getguide {
  guideStatus: number;
}
const state = reactive({
  logo: "https://file.gkxymentpeak.mentpeak.com/sleep-mini-program/images/common/common-logo.png",
  Getguide: {} as Getguide,
  jumpTo() {
    // 判断登录接口是否完成
    if (usestore.userInfo.token === "") return;
    let params = {
      openId: usestore.userInfo.openId,
    };
    // 判断是否完成新手引导
    getGuide(params, { failToast: true, loading: true }).then((res: Getguide) => {
      state.Getguide = res;
      state.Getguide.guideStatus === 1
        ? Taro.redirectTo({
          url: "/pages/guide/findAnimals/index",
        })
        : state.Getguide.guideStatus === 2
          ? Taro.redirectTo({
            url: "/pages/index/index",
          })
          : Taro.redirectTo({
            url: "/pages/guide/guidingProcess/index?index=6",
          });
    });
  },
});
</script>
<style lang="scss">
.page-container {
  text-align: center;
  margin: 0 auto;
  background-color: #f3f5f9;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .page-logo {
    position: relative;
    height: 100%;

    image {
      width: 90px;
      height: 90px;
      margin: 63px auto 0 auto;
    }

    .logo-name {
      font-size: 22px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #333333;
      line-height: 60px;
      margin-top: 10px;
    }
  }

  .page-btn {
    width: 315px;
    height: 58px;
    line-height: 58px;
    background: #60d394;
    border-radius: 15px;
    font-size: 15px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #ffffff;
    position: absolute;
    bottom: 50px;
    margin-left: 30px;
  }
}
</style>
