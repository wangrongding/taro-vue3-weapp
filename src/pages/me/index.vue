<script setup lang="ts">
import { reactive } from "vue";
const state = reactive({
  text: "Hello i'am rongding！",
});
</script>

<template>
  <view class="page-container"> {{ state.text }}</view>
</template>

<style lang="scss"></style>
