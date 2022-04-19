<script setup lang="ts">
import { reactive } from "vue";
import NavBar from "@/components/NavBar.vue";
import Taro from "@tarojs/taro";
import { useAssetsStore } from "@/stores/assets";
import { useStore } from "@/stores";
import { updateUserAnimalStatus, endAdventure } from "@/api/home";
import { SpoilsInfo } from "@/types/index";
const store = useAssetsStore();
const userStore = useStore();
const state = reactive({
  spoilsInfo: {} as SpoilsInfo,
  updateUserAnimalStatus() {
    updateUserAnimalStatus({}, { failToast: true, loading: true }).then(() => {
      Taro.redirectTo({
        url: "/pages/index/index",
      });
    });
  },
  endAdventure() {
    endAdventure().then((res: SpoilsInfo) => {
      state.spoilsInfo = res;
    });
  },
});
state.endAdventure();
</script>
<template>
  <view class="back-container">
    <NavBar style="color: black" />
    <view class="back-main">
      <view style="text-align: center; width: 100%">
        <image class="bear" :src="store.assets.bear.placeholder" alt="" />
        <view style="color: #666666ff; font-size: 14px; margin-top: 10px">
          "{{ userStore.userInfo.user_name || "--" }} , 你好呀~"
        </view>
        <view class="spoils">
          <image class="" :src="store.assets.common.heartShaped" alt="" />
          <text>+{{ state.spoilsInfo.intimateValue || "0" }} 亲密度</text>
        </view>
        <view class="spoils" v-if="state.spoilsInfo.soundName">
          <image class="" :src="store.assets.common.heartShaped" alt="" />
          <text>+1 {{ state.spoilsInfo.soundName || "--" }}的声音</text>
        </view>
      </view>
      <view
        @click="state.updateUserAnimalStatus"
        style="
          width: 120px;
          height: 50px;
          color: white;
          border-radius: 15px;
          text-align: center;
          background-color: #60d394ff;
          line-height: 50px;
        "
      >
        好的
      </view>
    </view>
  </view>
</template>
<style lang="scss">
.back-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  .back-main {
    padding: 30px;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    .bear {
      width: 105px;
      height: 120px;
    }
    .spoils {
      display: flex;
      height: 58px;
      line-height: 58px;
      width: 100%;
      flex-direction: row;
      justify-content: flex-start;
      background-color: #ff9b85ff;
      border-radius: 20px;
      margin: 20px 0;
      padding: 0 20px;
      box-sizing: border-box;
      align-items: center;
      &:last-child {
        background-color: #8990feff;
      }
      image {
        margin-right: 10px;
        height: 28px;
        width: 31px;
      }
    }
  }
}
</style>
