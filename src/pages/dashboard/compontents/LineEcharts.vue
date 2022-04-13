<template>
  <view class="echarts">
    <ec-canvas
      id="mychart-dom-area"
      canvas-id="mychart-area"
      :ec="ec"
    />
  </view>
</template>

<script setup lang="ts">
import * as echarts from "@/components/ec-canvas/echarts";
import { reactive } from "vue";
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
  });
  canvas.setChart(chart);
  chart.setOption({
    title: {
      text: "ECharts 入门示例",
    },
    tooltip: {},
    xAxis: {
      data: [
        "衬衫",
        "羊毛衫",
        "雪纺衫",
        "裤子",
        "高跟鞋",
        "袜子",
      ],
    },
    yAxis: {},
    series: [
      {
        name: "销量",
        type: "bar",
        data: [
          5,
          20,
          36,
          10,
          10,
          20,
        ],
      },
    ],
  });
  return chart;
}
const ec = reactive({
  onInit: initChart,
});
</script>
<style lang="scss">
.echarts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100vw;
  height: 300px;
}
ec-canvas {
  width: 100%;
  height: 100%;
}
</style>
