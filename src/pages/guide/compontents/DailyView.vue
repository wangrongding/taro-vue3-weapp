<template>
  <view>
    <view class="partner-title"> 每日查看 </view>
    <image class="dailyview-image" :src="state.logo" alt="" />
    <view class="logo-name">
      {{ props.animalName }}会去探险~
      <view class="name"> 晚上，{{ props.animalName }}陪你一起入睡，改善你的睡眠 </view>
    </view>
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
});
const state = reactive({
  logo: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
});
</script>

<style lang="scss">
.dailyview-image {
  margin: 103px 0 20px 0;
  width: 140px;
  height: 160px;
}
</style>
