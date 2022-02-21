<template>
  <view class="index">
    <Counter />
  </view>
</template>

<script>
import "./index.scss";
import Counter from "../../components/Counter.vue";
export default {
  name: "Index",
  components: {
    Counter,
  },
};
</script>

<!-- <script setup lang="ts">
import { ref } from "vue";
import Counter from "../../components/Counter.vue";
</script>
<template>
  <div class="page-container"></div>
</template>
<style lang="scss" scoped>
.page-container {
}
</style> -->
