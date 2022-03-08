<template>
  <image class="logo-image" :src="state.logo" alt="" />
  <view class="logo-name">{{ state.nameContent }}</view>
  <input
    class="animal-name"
    type="text"
    maxlength="10"
  >
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";

const state = reactive({
  logo: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
  nameContent: `你收到了一个熊宝宝!
  给TA取个名字吧～ `,
});
// const emit = defineEmits(["animalName"]);

// function nameOnBlur(e:string){
//   emit("animalName", e.detail.value);
// }
</script>