<script setup lang="ts">
import { reactive } from "vue";
const state = reactive({
  text: "报表！！",
});
</script>

<template>
  <view class="page-container"> {{ state.text }}</view>
</template>

<style lang="scss"></style>
