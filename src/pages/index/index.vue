<script setup lang="ts">
import { computed, reactive } from "vue";
import { getIntimacy } from "@/api/home/index";
import Taro from "@tarojs/taro";
import NavBar from "@/components/NavBar.vue";
import { useStore } from "@/stores/assets";
import Ambient from "@/pages/components/Ambient.vue";
import getTodayTarget from "@/pages/getTodayTarget/getTodayTarget.vue";
import bus from "@/utils/eventBus";
import Intimacy from "../components/Intimacy.vue";
const store = useStore();
const state = reactive({
  text: "Hello i'am rongding...",
  assets: store.assets.home,
  popShow: "",
  todayGoalPopup: false,
  // 我的
  me() {
    // TODO by qianqian
  },
  // 统计
  statistical() {
    // TODO by qianqian
  },
  // 获取亲密度
  getIntimacy() {
    state.popShow = "intimacy";
  },
  // 记录
  record() {
    Taro.redirectTo({
      url: "/pages/record/index",
      success() {},
    });
  },
  // 关闭弹窗
  closePop() {
    state.popShow = "";
    state.todayGoalPopup = false;
  },
  // 熊旅行
  travel() {
    execSomeThing();
  },
  // 今日目标列表
  getTodayTargetList() {
    state.todayGoalPopup = true;
  },
  // 环境音
  audio() {
    state.popShow = "anbient";
  },
  // 测试
  test() {
    // TODO by qianqian
  },
  // 目标模块
  target() {
    Taro.redirectTo({
      url: "/pages/target/index",
      success() {},
    });
  },
  // 日记模块
  diary() {
    Taro.redirectTo({
      url: "/pages/sleepDiary/index",
      success() {},
    });
  },
});
// 首页操作控制分发
function execSomeThing() {
  Taro.showToast({
    title: "开发中",
    icon: "error",
    duration: 1000,
  });
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

bus.on("closePop", () => {
  state.closePop();
});
</script>

<template>
  <view class="page-container">
    <NavBar>梦琦</NavBar>
    <view class="main">
      <view class="operation-bar">
        <!-- 我的 -->
        <image :src="state.assets.icon" alt="" @tap="state.statistical" />
        <!-- 统计 -->
        <image :src="state.assets.icon" alt="" @tap="state.getIntimacy" />
      </view>
      <view class="operation-bar">
        <!-- 亲密度 -->
        <image :src="state.assets.intimacy" alt="" @tap="state.getIntimacy" />
        <!-- 记录 -->
        <image :src="state.assets.icon" alt="" @tap="state.record" />
      </view>
      <view class="bear-area">
        <!-- 熊 -->
        <image class="bear" :src="state.assets.bear" alt="" />
        <!-- 蜂蜜 -->
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
          <view class="honey-text"> {{ 20 }}g </view>
        </view>
      </view>
      <!-- 底部操作栏: 日记/环境音/今日目标/测试/目标 -->
      <view class="operation-bar bottom-bar">
        <!--- 日记 -->
        <image :src="state.assets.icon" alt="" @tap="state.diary" />
        <!--- 环境音 -->
        <image :src="state.assets.audio" alt="" @tap="state.audio" />
        <!--- 今日目标 -->
        <nut-badge
          :value="1"
          top="1"
          right="20"
          @tap="state.getTodayTargetList"
        >
          <image :src="state.assets.today" class="today-target" alt="" />
        </nut-badge>
        <!--- 测试 -->
        <image :src="state.assets.icon" alt="" @tap="execSomeThing" />
        <!-- 目标 -->
        <image :src="state.assets.icon" alt="" @tap="state.target" />
      </view>
      <!-- 亲密度 -->
      <Intimacy :visible="state.popShow === 'intimacy'" />
      <!-- 环境音 -->
      <Ambient :visible="state.popShow === 'anbient'" />
      <!-- 今日目标列表 -->
      <getTodayTarget :today-target="state.todayGoalPopup" />
    </view>
  </view>
</template>

<style lang="scss">
.page-container {
  background-image: url("https://raw.githubusercontent.com/wangrongding/image-house/master/images202202281552325.png");
  background-color: #48c77d;
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
        .honey-text {
          font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
          color: white;
          z-index: 2;
          position: absolute;
          right: 50%;
          bottom: -10px;
          font-size: 26px;
          font-weight: bolder;
          transform: translateX(50%);
          -webkit-text-fill-color: white;
          -webkit-text-stroke-color: #804812ff;
          -webkit-text-stroke-width: 2px;
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
