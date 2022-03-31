<template>
  <view>
    <image class="dailylife-image" :src="state.logo" alt="" />
    <view class="logo-name">
      设置你的作息~
      <view class="name"> 让{{ props.animalName }}跟你一起日出而作，日落而息 </view>
      <view class="time">
        <view
          class="wake-time"
          v-for="(item, index) in state.timeList"
          :key="index"
          @tap="openTime(item)"
        >
          {{ item.title }}
        </view>
        <Bedtime :visible="state.show" @timeTable="timeTable" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Bedtime from "../../components/Bedtime.vue";
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
  timeList: [
    {
      title: "上床时间",
      id: 1,
    },
    {
      title: "起床时间",
      id: 2,
    },
  ],
  show: false,
  cancelId: 0,
});

const emit = defineEmits(["timeTable"]);

// 确认选择时间
function timeTable(selectedValue) {
  // 判断点击的是起床还是上床时间
  state.cancelId === 1
    ? (state.timeList[0].title = selectedValue)
    : (state.timeList[1].title = selectedValue);
  emit("timeTable", state.timeList);
  state.show = false;
}
// 打开选择时间器
function openTime(data) {
  state.cancelId = data.id;
  state.show = true;
}
</script>

<style lang="scss">
.dailylife-image {
  margin: 145px 0 20px 0;
  width: 140px;
  height: 160px;
}
.time {
  display: flex;

  .wake-time {
    margin: 0 20px;
    width: 120px;
    height: 50px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    margin-top: 30px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 50px;
  }
  .wake-time:nth-child(1) {
    margin-left: 52px;
  }
}
</style>
