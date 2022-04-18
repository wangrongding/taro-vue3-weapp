<template>
  <view class="echarts">
    <view class="title">{{ props.upTimeStatistics.title }}</view>
    <ec-canvas
      id="mychart-dom-area"
      canvas-id="mychart-area"
      :ec="ec"
      force-use-old-canvas="true"
    />
  </view>
</template>

<script setup lang="ts">
import * as echarts from "@/components/ec-canvas/echarts";
import { reactive } from "vue";

const props = defineProps({
  upTimeStatistics: {
    type: Object,
    default() {
      return {};
    },
    required: true,
  },
});
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
  });
  canvas.setChart(chart);
  chart.setOption({
    xAxis: {
      type: "category",
      data: props.upTimeStatistics.xaxis,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#EE6055",
          width: 0,
          type: "solid",
        },
      },
      axisLabel: {
        // x轴文字的配置
        show: true,
        interval: 0, // 使x轴文字显示全
        color: "#999999",
        formatter: function (params) {
          let newParamsName = "";
          let paramsNameNumber = params.length;
          let provideNumber = 1; // 一行显示几个字
          let rowNumber = 2;
          if (paramsNameNumber > provideNumber) {
            for (let p = 0; p < rowNumber; p++) {
              let tempStr = "";
              let start = p * provideNumber;
              let end = start + provideNumber;
              if (p === rowNumber - 1) {
                tempStr = params.substring(start, paramsNameNumber);
              } else {
                tempStr = params.substring(start, end) + "\n";
              }
              newParamsName += tempStr;
            }
          } else {
            newParamsName = params;
          }
          return newParamsName;
        },
      },
    },
    yAxis: {
      type: "value",
      min: 0, // 最小
      max: 24,
      splitNumber: 4,
      axisLabel: {
        formatter: function (val) {
          return val + ":00";
        },
      },
    },
    series: [
      {
        data: props.upTimeStatistics.yaxis,
        type: "bar",
        barWidth: 10, // 柱图宽度
        itemStyle: {
          normal: {
            barBorderRadius: [
              10,
              10,
              0,
              0,
            ],
          },
        },
      },
    ],
    grid: {
      width: "84%", // 宽度
      height: "68%", // 高度
      top: "18%",
      left: "14%",
    },
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
  width: 335px;
  height: 260px;
  background: #ffffff;
  box-shadow: 0px 0px 2px 1px rgba(96, 211, 148, 0.1);
  border-radius: 15px;
  position: reactive;
  padding-bottom: 10px;
  margin-bottom: 10px;
  .title {
    font-size: 12px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #333333;
    text-align: left;
    padding-top: 14px;
    position: absolute;
    left: 21px;
  }
  ec-canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
