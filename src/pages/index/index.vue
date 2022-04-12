<script setup lang="ts">
import { reactive, computed } from "vue";
import Taro from "@tarojs/taro";
import NavBar from "@/components/NavBar.vue";
import { useAssetsStore } from "@/stores/assets";
import Ambient from "@/pages/components/Ambient.vue";
import GetTodayTarget from "@/pages/getTodayTarget/getTodayTarget.vue";
import Test from "@/pages/test/index.vue";
import bus from "@/utils/eventBus";
import Intimacy from "../components/Intimacy.vue";
import Goout from "../components/Goout.vue";
import Bear from "../components/Bear.vue";
const store = useAssetsStore();
const state = reactive({
  text: "Hello i'am rongding...",
  assets: store.assets.home,
  popShow: "",
  todayGoalPopup: false,
  testGoalPopup: false,
  // 我的
  me() {
    Taro.navigateTo({
      url: "/pages/me/index",
    });
  },
  // 统计
  statistical() {
    Taro.navigateTo({
      url: "/pages/dashboard/index",
    });
  },
  // 获取亲密度
  getIntimacy() {
    state.popShow = "intimacy";
  },
  // 记录
  record() {
    Taro.navigateTo({
      url: "/pages/record/index",
    });
  },
  // 关闭弹窗
  closePop() {
    state.popShow = "";
  },
  // 今日目标列表
  getTodayTargetList() {
    state.popShow = "getTodayTarget";
  },
  // 点击其他弹框隐藏目标弹框
  moreVisible(data: string) {
    if (data === "") return (state.popShow = "");
    state.getTodayTargetList();
  },
  // 环境音
  audio() {
    state.popShow = "ambient";
  },
  // 测试
  test() {
    state.popShow = "test";
  },
  // 目标模块
  target() {
    Taro.navigateTo({
      url: "/pages/target/index",
    });
  },
  // 日记模块
  diary() {
    Taro.navigateTo({
      url: "/pages/sleepDiary/index?id=4",
    });
  },
});
// 关闭弹窗
bus.on("closePop", () => {
  state.closePop();
});
bus.on("handlePopupShow", (type: string) => {
  state.popShow = type;
});

// 根据时间动态切换背景图片
const background = computed(() => {
  if (new Date().getHours() > 6 && new Date().getHours() < 18) {
    return {
      color: "#48c77d",
      image: `url(${store.assets.background.homeBackgroundDay})`,
    };
  } else {
    return {
      color: "#32a5de",
      image: `url(${store.assets.background.homeBackgroundNight})`,
    };
  }
});
</script>

<template>
  <view
    class="page-container"
    :style="{
      backgroundImage: background.image,
      backgroundColor: background.color,
    }"
  >
    <NavBar />
    <view class="main">
      <view class="operation-bar">
        <!-- 我的 -->
        <image :src="state.assets.my" alt @tap="state.me" />
        <!-- 统计 -->
        <image :src="state.assets.statistics" alt="" @tap="state.statistical" />
      </view>
      <view class="operation-bar">
        <!-- 亲密度 -->
        <image :src="state.assets.intimacyValue" alt @tap="state.getIntimacy" />
        <!-- 记录 -->
        <image :src="state.assets.record" alt @tap="state.record" />
      </view>
      <!-- 熊与蜂蜜 -->
      <Bear class="main-area" />
      <!-- 底部操作栏: 日记/环境音/今日目标/测试/目标 -->
      <view class="operation-bar bottom-bar">
        <!--- 日记 -->
        <image :src="state.assets.diary" alt @tap="state.diary" />
        <!--- 环境音 -->
        <image :src="state.assets.ambientSound" alt @tap="state.audio" />
        <!--- 今日目标 -->
        <nut-badge
          :value="1"
          top="1"
          right="20"
          @tap="state.getTodayTargetList"
        >
          <image :src="state.assets.todayGoal" class="today-target" alt />
        </nut-badge>
        <!--- 测试 -->
        <image :src="state.assets.test" alt @tap="state.test" />
        <!-- 目标 -->
        <image :src="state.assets.target" alt @tap="state.target" />
      </view>
      <!-- 亲密度 -->
      <Intimacy :visible="state.popShow === 'intimacy'" />
      <!-- 环境音 -->
      <Ambient :visible="state.popShow === 'ambient'" />
      <!-- 今日目标列表 -->
      <GetTodayTarget
        :visible="state.popShow === 'getTodayTarget'"
        @moreVisible="state.moreVisible"
      />
      <!-- 测试 -->
      <Test :visible="state.popShow === 'test'" />
      <!-- 熊出去的提示 -->
      <Goout :visible="state.popShow === 'goout'" />
    </view>
  </view>
</template>

<style lang="scss">
.page-container {
  background-size: 100% auto;
  background-position: center top;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
