<template>
  <view class="page-container">
    <NavBar style="color: #000">梦琦</NavBar>
    <view class="page-main">
      <view class="privacyPolicy-list" v-for="(item, index) in state.getPrivacyPolicy" :key="index">
        <view class="privacyPolicy-title"> {{ item.title }} </view>
        <view class="privacyPolicy-title-aa">
          <text class="privacyPolicy-content"> {{ item.content }} </text>
        </view>
      </view>
    </view>
    <view class="close">
      <image :src="state.assets.close" alt="" @tap="state.close" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
import NavBar from "../../components/NavBar.vue";
import { getPrivacyPolicy } from "@/api/me/index";
import { useAssetsStore } from "@/stores/assets";
import { GetPrivacyPolicy } from "@/types/type";
const store = useAssetsStore();
const state = reactive({
  assets: store.assets.common,
  getPrivacyPolicy: [] as GetPrivacyPolicy[],
  close() {
    Taro.redirectTo({
      url: "/pages/me/index",
    });
  },
  getPrivacyPolicyData() {
    getPrivacyPolicy()
      .then((res:GetPrivacyPolicy[]) => {
        state.getPrivacyPolicy = res;
      });
  },
});
state.getPrivacyPolicyData();
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
    flex: 1;
    overflow: auto;
    margin: 0 auto;
    padding-bottom: 10px;
    .privacyPolicy-list {
      width: 335px;
      .privacyPolicy-title {
        text-align: center;
        font-size: 22px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #333333;
        margin: 15px 0;
      }
      .privacyPolicy-title-aa {
        text-indent: 30px;
        .privacyPolicy-content {
          font-size: 17px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
        }
      }
    }
  }
  .close {
    width: 100%;
    text-align: center;
    margin: 15px auto 30px auto;
    image {
      width: 58px;
      height: 58px;
    }
  }
}
</style>
