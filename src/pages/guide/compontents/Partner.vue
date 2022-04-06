<template>
  <view>
    <view class="partner-title"> 你的同伴 </view>
    <view class="partner-subtitle"> {{ props.animalName }}会一直在你身边 </view>
    <view class="intimacy-icon">
      <image :src="props.assets.common.heartShaped" alt="" />
    </view>
    <image class="partner-image" :src="props.assets.bear.hello" alt="" />
    <view class="logo-name"> {{ state.nameContent }} </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const props = defineProps({
  animalName: {
    type: String,
    default() {
      return "";
    },
    required: true,
  },
  assets: {
    type: Object,
    default() {
      return {};
    },
    required: true,
  },
});
const state = reactive({
  nameContent: `通过一些日常活动
  可以增加你们的感情~ `,
});
</script>

<style lang="scss">
.partner-title {
  padding: 52px 0 5px 0;
  font-size: 17px;
  font-family: PingFang-SC-Bold, PingFang-SC;
  font-weight: bold;
  color: #333333;
}
.partner-subtitle {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.intimacy-icon {
  width: 100%;
  margin: 20px auto;

  image {
    width: 33.5px;
    height: 30px;
  }
}
.partner-image {
  margin: 10px 0 20px 0;
  width: 140px;
  height: 160px;
}
</style>
