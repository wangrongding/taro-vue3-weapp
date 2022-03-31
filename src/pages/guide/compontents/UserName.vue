<template>
  <image class="logo-image" :src="state.logo" alt="" />
  <view class="logo-name">
    “啊~谢谢你把我放出来~外面好明亮，你是？”
  </view>
  <input
    class="animal-name"
    type="text"
    cursor-spacing="50"
    maxlength="10"
    @blur="nameOnBlur"
  >
</template>

<script setup lang="ts">
import { reactive } from "vue";
const state = reactive({
  logo: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
});
const emit = defineEmits(["userName"]);

function nameOnBlur(e){
  emit("userName", e.detail.value);
}
</script>
