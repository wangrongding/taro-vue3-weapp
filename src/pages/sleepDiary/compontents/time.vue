<template>
  <view class="time">
    <view class="title-select" @tap="open">{{ props.defaultValue.desc }}</view>
    <nut-datepicker
      type="datetime"
      @confirm="confirm"
      :visible="state.show"
      :min-date="state.minDate"
      :max-date="state.maxDate"
      @close="close"
    />
    <!-- <picker-view
      indicator-style="height: 80px;"
      :value="valueArr"
      class="picker-view"
      mask-style="opacity: 0;"
      style="line-height: 80px"
      @change="state.answer"
    >
      <picker-view-column class="hours">
        <view v-for="(item, index) in state.hours" :key="index">{{ item }}</view>
      </picker-view-column>
      <picker-view-column>
        <view> : </view>
      </picker-view-column>
      <picker-view-column class="minutes">
        <view v-for="(item, index) in state.minutes" :key="index">{{ item }}</view>
      </picker-view-column>
    </picker-view> -->
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
const emit = defineEmits(["desc"]);
const props = defineProps({
  defaultValue: {
    type: Object,
    default: () => ({}),
    required: true,
  },
});
const state = reactive({
  show: false,
  conversion: "",
  minDate: new Date(2000, 0, 1),
  maxDate: new Date(2023, 11, 31, 22, 60),
  // valueArr: ["23","12"],
  // hours: [],
  // minutes: [],
  // checkTime: "",
  // time() {
  //   for (let i = 0; i <= 23; i++) {
  //     state.hours.push(i < 10 ? "0" + i : i);
  //   }
  //   for (let i = 0; i <= 59; i++) {
  //     state.minutes.push(i < 10 ? "0" + i : i);
  //   }
  // },
  // answer(e) {
  //   state.checkTime = e.detail.value[0] + " : " + e.detail.value[2];
  //   emit("checkTime", state.checkTime);
  // },
});
function confirm(res) {
  let conversionNum: number;
  let conversionString: string;
  state.conversion = "";
  res.forEach((item) => {
    conversionNum = parseInt(item.replace(/\p{Unified_Ideograph}/gu, ""));
    state.conversion += conversionNum < 10 ? "0" + conversionNum + "-" : conversionNum + "-";
  });
  conversionString = state.conversion.slice(0, state.conversion.length - 1);
  state.desc =
    conversionString.substring(0, 10) + " " + conversionString.substring(11, 17)
      .replace("-", ":");
  emit("desc", state.desc);
  close();
}
function open() {
  state.show = true;
}
// 点击蒙版关闭时间选择器
function close() {
  state.show = false;
}
</script>

<style lang="scss">
.time {
  .title-select {
    width: 335px;
    height: 58px;
    background: #ffffff;
    box-shadow: 0px 5px 12.5px 0px rgba(96, 211, 148, 0.3);
    border-radius: 15px;
    margin: 60px auto;
    font-size: 17px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    text-align: center;
    line-height: 58px;
  }
  .nut-picker__button {
    color: rgba(96, 211, 148, 1);
    font-size: 17px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
  }
}
</style>
