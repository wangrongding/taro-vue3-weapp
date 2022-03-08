<script setup lang="ts">
import { computed, reactive } from "vue";
import { getIntimacy } from "@/api/home/index";
import Taro from "@tarojs/taro";
import NavBar from "@/components/NavBar.vue";
import { useStore } from "@/stores";
const store = useStore();
const state = reactive({
  text: "Hello i'am rongding...",
  assets: store.assets.home,
  showTeleport: false,
  // 获取亲密度
  getIntimacy() {
    getIntimacy();
  },
  // 熊旅行
  travel() {
    Taro.showToast({
      title: "开发中",
      icon: "error",
      duration: 1000,
    });
  },
  // 今日目标列表
  getTodayTargetList() {},

  // 环境音
  audio() {
    // do something
  },
  // 测试
  test() {
    // todo by qianqian
  },
  // 目标模块
  target() {
    // todo by qianqian
  },
  // 日记模块
  diary() {
    // todo by qianqian
  },
});
// 获取亲密度
function execSomeThing(type: string) {
  switch (type) {
    case "audio": {
      // state.travel();
      state.showTeleport = !state.showTeleport;
      break;
    }
    default:
      state.travel();
      break;
  }
}

// 一个计算属性 ref
const getSize: any = computed(() => {
  let systemInfo = {};
  Taro.getSystemInfoAsync({
    success(res) {
      systemInfo = res;
    },
  });
  return systemInfo;
});
// eslint-disable-next-line
// console.log(getSize.value, "😀😀😀😀😀");
// console.log(getSize.value.devicePixelRatio, "😀😀😀😀😀");
// console.log(getSize.value.screenWidth, "😀😀😀😀😀");
// console.log(getSize.value.windowWidth, "😀😀😀😀😀");
</script>

<template>
  <view class="page-container">
    <NavBar>首页</NavBar>
    <!-- 公用的首页弹窗组件 -->

    <view
      class="pop"
      v-show="state.showTeleport"
      @tap="execSomeThing('audio')"
      style="
        z-index: 9999;
        background-color: #fff;
        width: 100vw;
        height: 75vh;
        border-radius: 20px 20px 0 0;
      "
    >
      <view>
        <image
          :src="state.assets.icon"
          alt=""
          style="height: 50px; width: 50px; margin: -100px 0 0 100px"
        />
        <view class="list"> sdfsdf </view>
      </view>
    </view>
    <!-- <nut-popup
      position="bottom"
      close-icon-position="top-left"
      close-icon="close-little"
      pop-class="pop"
      round
      :style="{ padding: '30px 0px', height: '70%' }"
      close-on-click-overlay
      closeable
      :visible="state.showTeleport"
      :z-index="100"
      @click-overlay="state.showTeleport = false"
      @click-close-icon="state.showTeleport = false"
    >
      <view>
        <image
          :src="state.assets.icon"
          alt=""
          @tap="state.getIntimacy"
          style="margin-top: -100px"
        />
        <view class="list"> sdfsdf </view>
      </view>
    </nut-popup> -->
    <view class="main">
      <!-- 我的/统计 -->
      <view class="operation-bar">
        <image :src="state.assets.icon" alt="" @tap="state.getIntimacy" />
        <image :src="state.assets.icon" alt="" @tap="state.getIntimacy" />
      </view>
      <!-- 亲密度/统计 -->
      <view class="operation-bar">
        <image :src="state.assets.icon" alt="" @tap="state.travel" />
        <image :src="state.assets.icon" alt="" @tap="state.travel" />
      </view>
      <!-- 熊/蜂蜜 -->
      <view class="bear-area">
        <image class="bear" :src="state.assets.bear" alt="" />
        <view class="honeypot">
          <nut-circleprogress
            :progress="(20 / 30) * 100"
            :is-auto="true"
            @tap="state.travel"
            stroke-inner-width="4"
            :progress-option="{
              radius: 18 * (getSize.screenWidth / 375),
              backColor: '#FFF',
              progressColor: '#FFD97DFF',
            }"
            style="z-index: 2; position: absolute; top: 0; left: 0; bottom: 0; right: 0"
          />
          <image :src="state.assets.honey" class="honey-img" />
        </view>
      </view>
      <!-- 底部操作栏: 日记/环境音/今日目标/测试/目标 -->
      <view class="operation-bar bottom-bar">
        <image :src="state.assets.icon" alt="" @tap="execSomeThing('item')" />
        <image :src="state.assets.audio" alt="" @tap="execSomeThing('audio')" />
        <nut-badge :value="1" top="1" right="20">
          <image :src="state.assets.today" class="today-target" alt="" />
        </nut-badge>
        <image :src="state.assets.icon" alt="" @tap="execSomeThing('item')" />
        <image :src="state.assets.icon" alt="" @tap="execSomeThing('item')" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.page-container {
  background-image: url("https://raw.githubusercontent.com/wangrongding/image-house/master/images202202281552325.png");
  background-color: #48c77d;
  // background-size: 100% 100%;
  background-size: 100% auto;
  // background-position: center bottom;
  background-position: center top;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .pop {
    position: absolute;
    bottom: 0;
    &::before {
      content: "";
      position: absolute;
      top: -50px;
      left: 125px;
      width: 100px;
      height: 100px;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  //首页主要内容
  .main {
    margin-top: 10px;
    height: 100%;
    position: relative;
    flex: 1;
    .operation-bar {
      // width: 100%;
      padding: 0 21px;
      margin-bottom: 18px;
      display: flex;
      justify-content: space-between;
      image {
        width: 44px;
        height: 54px;
      }
    }
    // 熊区域
    .bear-area {
      height: 200px;
      width: 100%;
      position: absolute;
      bottom: 150px;
      // display: flex;
      // flex-direction: row;
      // justify-content: center;
      text-align: center;
      .bear {
        width: 140px;
        height: 160px;
        align-items: center;
      }
      .honeypot {
        position: absolute;
        right: 25px;
        bottom: 25px;
        border-radius: 50%;
        width: 52px;
        height: 52px;
        // border: 1px solid red;
        .honey-img {
          width: 52px;
          height: 52px;
          // margin-top: 5px;
          z-index: 1;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    }
    // 底部操作栏
    .bottom-bar {
      height: 64px;
      position: absolute;
      width: 100%;
      box-sizing: border-box;
      bottom: 0px;
      display: flex;
      align-items: center;
      .today-target {
        width: 104px;
        height: 60px;
      }
    }
  }
}
</style>
