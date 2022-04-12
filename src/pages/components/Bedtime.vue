<template>
  <nut-picker
    :visible="props.visible"
    :columns="multipleColumns"
    v-model="state.asyncValue"
    @confirm="confirm"
    @close="close"
  />
</template>

<script setup lang="ts">
import { reactive, ref ,watchEffect } from "vue";
const props = defineProps({
  visible: {
    type: Boolean,
    default() {
      return false;
    },
    required: true,
  },
  cancelId: {
    type: Number,
    default() {
      return 0;
    },
    required: true,
  },
});

interface Time {
  text: any,
  value: any,
}
const state = reactive({
  cancelIdValue: 0,
  hours: [] as Time[],
  minutes: [] as Time[],
  asyncValue: ref<string[]>([]),
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
watchEffect(() => {
  props.cancelId === 1 ? state.asyncValue = ["23"] : state.asyncValue = ["07"];
});
const emit = defineEmits(["timeTable", "close"]);
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
  emit("close","");
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
