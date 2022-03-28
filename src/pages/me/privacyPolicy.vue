<template>
  <view class="page-container">
    <NavBar style="color: #000">梦琦</NavBar>
    <view class="page-main">
      <view class="privacyPolicy-title"> 隐私政策 </view>
      <view class="privacyPolicy-title-aa">
        <text class="privacyPolicy-content"> {{ state.content }} </text>
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
const store = useStore();
const state = reactive({
  assets: store.assets.home,
  content:
    "睡眠限制是一种减少你在床时间的技术，你上周平均每晚实际睡6小时，平均在床时间8小时，有2个小时醒着躺在床上，平均睡眠效率为75%，长时间醒着躺在床上会导致睡眠问题。\n 在睡眠限制中减少你的在床时间（8小时），使之与实际睡眠时间（6小时）尽量接近，增加你的睡眠驱动力，提高睡眠效率，然后再逐渐增加你的在床时间，这是认知行为疗法中很艰难但也行之有效的方法。\n 睡眠效率持续保持在85%-90%或以上，说明你的睡眠质量不错。第一周需持续记录7天睡眠日记，第一周后只需持续记录一周内5天睡眠日记即可获得睡眠限制窗口建议。",
  close() {
    Taro.redirectTo({
      url: "/pages/me/index",
      success() {},
    });
  },
});
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
      height: 418px;
      .privacyPolicy-content {
        font-size: 17px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
      }
    }
    .close {
      width: 100%;
      text-align: center;
      margin-top: 35px;
      image {
        width: 50px;
        height: 58px;
      }
    }
  }
}
</style>
