<template>
  <!-- 单选 -->
  <view class="singleChoice">
    <view
      class="answer"
      :class="state.defaultNumber.number === index ? 'answer-select' : ''"
      v-for="(item, index) in props.singleChoiceList.optionList"
      :key="index"
      @tap="state.answerBtn(item, index)"
    >
      <span class="singleChoice-sort">{{ item.sort }}.</span>
      <span class="singleChoice-title">{{ item.title }}</span>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
const emit = defineEmits(["singleChoice"]);
const props = defineProps({
  singleChoiceList: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  defaultValue: {
    type: Object,
    default: () => ({}),
    required: true,
  },
});
const state = reactive({
  singleChoice: [],
  defaultNumber: props.defaultValue,
  // 选择答案
  answerBtn(data, index) {
    state.defaultNumber.number = data.number = index;
    state.singleChoice = [];
    state.singleChoice.unshift(data.id);
    emit("singleChoice", state.singleChoice);
  },
});
</script>

<style lang="scss">
.singleChoice {
  .answer {
    width: 335px;
    height: 58px;
    line-height: 58px;
    background: rgba(98, 104, 212, 0.9);
    border-radius: 15px;
    margin: 10px auto;
    display: flex;
    span {
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #ffffff;
      font-size: 16px;
    }
    .singleChoice-sort {
      padding-left: 21px;
    }
    .singleChoice-title {
      padding-left: 15px;
    }
  }
  .answer-select {
    background: #ffffff;
    span {
      color: #333333;
    }
  }
}
</style>
