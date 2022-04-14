<template>
  <view class="time">
    <view class="title-select" @tap="open">{{ props.defaultValue.desc }}</view>
    <nut-datepicker
      type="datetime"
      @confirm="confirm"
      :visible="state.show"
      :min-date="state.minDate"
      :max-date="state.maxDate"
      :is-show-chinese="true"
      @close="close"
      v-model="state.time"
    />
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
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
  minDate: new Date(2000, 0, 1),
  maxDate: new Date(2023, 11, 31, 22, 60),
  desc: "",
  time: new Date(),
});
function confirm(selectedValue) {
  state.desc =
    selectedValue.selectedValue.slice(0, 3)
      .join("-") +
    " " +
    selectedValue.selectedValue.slice(3)
      .join(":");
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
