<script setup lang="ts">
import { computed, reactive } from "vue";
import { getIntimacy } from "@/api/home/index";
import Taro from "@tarojs/taro";
import NavBar from "@/components/NavBar.vue";
import { useStore } from "@/stores";
import Ambient from "@/pages/ambient/index.vue";
const store = useStore();
const state = reactive({
  text: "Hello i'am rongding...",
  assets: store.assets.home,
  popShow: "",
  todayGoalPopup: false,
  closePop() {
    state.popShow = "";
  },
  // 获取亲密度
  getIntimacy() {
    getIntimacy({}, { failToast: true, loading: true });
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
  getTodayTargetList() {
    state.todayGoalPopup = true;
  },

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
    Taro.redirectTo({
      url: "/pages/target/index",
      success() {},
    });
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
      state.popShow = "anbient";
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

// 获取权限
function authorize() {
  // Taro.getUserProfile({
  //   desc: "用于完善用户资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //   success: (res) => {
  //     // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //     this.setState({
  //       userInfo: res.userInfo,
  //       hasUserInfo: true,
  //     });
  //   },
  // });
  // 可以通过 Taro.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
}
</script>

<template>
  <view class="page-container">
    <NavBar>首页</NavBar>
    <!-- 环境音 -->
    <Ambient :visible="state.popShow === 'anbient'" @closePop="state.closePop" />
    <view class="main">
      <!-- 我的/统计 -->
      <view class="operation-bar">
        <image :src="state.assets.icon" alt="" @tap="authorize" />
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
        <nut-badge
          :value="1"
          top="1"
          right="20"
          @tap="state.getTodayTargetList"
        >
          <image :src="state.assets.today" class="today-target" alt="" />
        </nut-badge>
        <image :src="state.assets.icon" alt="" @tap="execSomeThing('item')" />
        <image :src="state.assets.icon" alt="" @tap="state.target" />
      </view>
      <!-- 今日目标列表 -->
      <!-- <getTodayTarget :todayGoalPopup="state"></getTodayTarget> -->
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
