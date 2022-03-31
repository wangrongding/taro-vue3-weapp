<template>
  <!-- 多选 -->
  <view class="multipleChoice">
    <view
      class="answer"
      :class="item.active ? 'answer-select' : ''"
      v-for="(item, index) in props.singleChoiceList.optionList"
      :key="index"
      @tap="state.answerBtn(item)"
    >
      <span class="multipleChoice-sort">{{ item.sort }}.</span>
      <span class="multipleChoice-title">{{ item.title }}</span>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const emit = defineEmits(["multipleChoice"]);
const props = defineProps({
  singleChoiceList: {
    type: Array,
    default() {
      return [];
    },
    required: true,
  },
});
const state = reactive({
  multipleChoice: [],
  // 选择答案
  answerBtn(data) {
    // 判断是否是没有被影响
    if (data.id === "1502112911429476354") {
      props.singleChoiceList.optionList.forEach((item) => {
        item.active = false;
      });
    } else {
      props.singleChoiceList.optionList.forEach((item) => {
        if (item.id === "1502112911429476354") item.active = false;
      });
    }

    data.active = !data.active;
    if (data.active === true) {
      state.multipleChoice.push(data.id);
    } else {
      let index = state.multipleChoice.indexOf(data.id);
      if (index > -1) state.multipleChoice.splice(index, 1);
    }
    emit("multipleChoice", state.multipleChoice);
  },
});
</script>

<style lang="scss">
.multipleChoice {
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
    .multipleChoice-sort {
      padding-left: 21px;
    }
    .multipleChoice-title {
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
