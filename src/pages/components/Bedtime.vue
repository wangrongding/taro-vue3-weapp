<template>
  <nut-picker
    :visible="props.visible"
    :columns="multipleColumns"
    @confirm="confirm"
    :cancel-text="state.cancelText"
    @close="close"
  />
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import Taro from "@tarojs/taro";
const props = defineProps({
  visible: {
    type: Boolean,
    default() {
      return false;
    },
    required: true,
  },
});
const state = reactive({
  visible: props.visible,
  hours: [],
  minutes: [],
  cancelId: "",
  time() {
    for (let i = 0; i <= 23; i++) {
      state.hours.push({
        text: i < 10 ? "0" + i : i,
        value: i < 10 ? "0" + i : i,
      });
    }
    for (let i = 0; i <= 59; i++) {
      state.minutes.push({
        text: i < 10 ? "0" + i : i,
        value: i < 10 ? "0" + i : i,
      });
    }
  },
});
const emit = defineEmits(["timeTable"]);
const multipleColumns = ref([
  // 第一列
  state.hours,
  // 添加：
  [
    {
      value: ":",
    },
  ],
  // 第二列
  state.minutes,
]);

// 确认选择时间
function confirm(selectedValue) {
  // 判断点击的是起床还是上床时间
  emit("timeTable", selectedValue.selectedValue.join(""));
}
// 点击蒙版关闭时间选择器
function close() {
  state.visible = false;
}
// -------- 初始化 -------
state.time();
</script>

<style lang="scss">
.nut-picker-item {
  opacity: 0;
}
.nut-picker__button {
  font-size: 17px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #60d394;
}
.nut-picker__left {
  font-size: 17px;
  font-family: PingFang-SC-Bold, PingFang-SC;
  font-weight: bold;
  color: #333333;
}
</style>
