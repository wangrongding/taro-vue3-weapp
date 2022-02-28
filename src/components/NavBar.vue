<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";

const state = reactive({ navigatorInfo: {} } as any);

try {
  //获取到状态栏高度
  const statusBarHeight = Taro.getSystemInfoSync().statusBarHeight as any;
  state.navigatorInfo.statusBarHeight = statusBarHeight;
  //获取菜单按钮胶囊按钮的布局位置信息。
  const menuButtonInfo = Taro.getMenuButtonBoundingClientRect();
  //胶囊的高度
  state.navigatorInfo.menuButtonHeight = menuButtonInfo.height;
  //胶囊偏移top值
  state.navigatorInfo.menuButtonTop = menuButtonInfo.top;
} catch (e) {
  // Do something when catch error
}
</script>

<template>
  <view
    class="nav-container"
    :style="{
      height: state.navigatorInfo.menuButtonHeight + 'px',
      paddingTop: state.navigatorInfo.menuButtonTop + 'px',
      lineHeight: state.navigatorInfo.menuButtonHeight + 'px',
      textAlign: 'center',
      boxSizing: 'content-box',
    }"
  >
    <slot></slot>
  </view>
</template>
<style lang="scss" scoped>
.nav-container {
  box-sizing: content-box;
}
</style>
