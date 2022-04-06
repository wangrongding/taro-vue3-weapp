<template>
  <view>
    <image class="logo-image" :src="props.assets.bear.expressionless" alt="" />
    <view class="logo-name">{{ state.nameContent }}</view>
    <input
      class="animal-name"
      type="text"
      maxlength="10"
      @blur="nameOnBlur"
    >
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const props = defineProps({
  assets: {
    type: Object,
    default() {
      return {};
    },
    required: true,
  },
});
const state = reactive({
  nameContent: `你收到了一个熊宝宝!
  给TA取个名字吧～ `,
});
const emit = defineEmits(["animalName"]);
function nameOnBlur(e) {
  emit("animalName", e.detail.value);
}
</script>
