<template>
  <view class="page-container">
    {{ state.text }}
    <view @tap="state.jumpTo" class="btn"> 跳转首页 </view>
  </view>
</template>


<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
const state = reactive({
  text: "引导页，点击跳首页！",
  jumpTo() {
    Taro.navigateTo({
      url: "/pages/index/index?id=1",
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          // console.log(data);
        },
        someEvent: function (data) {
          // console.log(data);
        },
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit("acceptDataFromOpenedPage", { data: "test" });
        // res.eventChannel.emit("acceptDataFromOpenerPage", { data: "test" });
      },
    });
  },
});
</script>

<style lang="scss">
.btn {
  background-color: bisque;
  text-align: center;
  width: 400px;
  height: 400px;
  line-height: 400px;
  margin: 0 auto;
}
</style>
