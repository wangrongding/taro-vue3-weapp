<template>
  <image class="logo-image" :src="props.assets.bear.doubt" alt="" />
  <view class="logo-name"> “啊~谢谢你把我放出来~外面好明亮，你是？” </view>
  <input
    class="animal-name"
    type="text"
    cursor-spacing="50"
    maxlength="10"
    @blur="nameOnBlur"
  >
</template>

<script setup lang="ts">
const props = defineProps({
  assets: {
    type: Object,
    default() {
      return {};
    },
    required: true,
  },
});
const emit = defineEmits(["userName"]);

function nameOnBlur(e) {
  emit("userName", e.detail.value);
}
</script>
