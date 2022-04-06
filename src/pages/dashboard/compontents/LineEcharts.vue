<template>
  <view class="page-container">
    <e-chart ref="vueref0" canvas-id="bar-canvas" />
  </view>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { EChart } from "echarts4taro3";
const state = reactive({ file: "page" });
const vueref0 = ref();
const option = {
  xAxis: {
    type: "category",
    data: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [
        820,
        932,
        901,
        934,
        1290,
        1330,
        1320,
      ],
      type: "line",
      smooth: true,
    },
  ],
};
onMounted(() => {
  vueref0.value.refresh(option);

});
</script>

<style lang="scss">
.page-container {
}
</style>
