<template>
  <view class="countTimes">
    <nut-inputnumber
      v-model="state.value"
      min="0"
      @add="state.addNumber"
      @reduce="state.removeNumber"
    />
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
const emit = defineEmits(["countNum"]);
const state = reactive({
  value: 0,
  addNumber() {
    // 因前端是从0开始
    state.value++;
    emit("countNum", state.value);
  },
  removeNumber() {
    if (state.value <= 0) return;
    state.value--;
    emit("countNum", state.value);
  },
});
</script>

<style lang="scss">
.countTimes {
  margin: 100px 0 0 0;
  width: 100%;
  .nut-inputnumber {
    margin: 0 auto;
    text-align: center;
  }
  .nut-inputnumber .h5-input,
  .nut-inputnumber__text--readonly {
    width: 80px;
    height: 46px;
    background: #f5f5f5;
    border-radius: 8px;
    font-size: 17px;
  }
  .nut-inputnumber__icon--disabled {
    color: rgba(255, 255, 255, 0.5) !important;
  }
  .nut-inputnumber__icon {
    font-size: 40px;
    color: #fff;
    font-weight: 300;
    margin: 0 8px;
  }
}
</style>
