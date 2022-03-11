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
  todayGoalPopup: false,
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

  Taro.getUserProfile({
    desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      // console.log(res);
    },
  });
}
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
      <view class="today-goal">
        <nut-popup
          position="bottom"
          :style="{ height: '543px', background: 'rgba(240, 247, 244, 1)' }"
          round
          close-on-click-overlay
          closeable
          :visible="state.todayGoalPopup"
          @click-overlay="state.todayGoalPopup = false"
          @click-close-icon="state.todayGoalPopup = false"
        >
          <view class="today-goal-main">
            <!-- 空状态 -->
            <!-- <nut-empty description="今天想做点什么呢？" class="today-goal-empty">
            <template #image>
              <img :src="state.assets.bear" />
            </template>
          </nut-empty> -->
            <!-- 有目标状态 -->
            <view class="today-goal-list">
              <view class="title">
                <image class="title-logo" :src="state.assets.icon" alt="" />
                <view class="title-name"> 睡前2小时避免剧烈运动 </view>
                <view class="today-data"> 5 <image :src="state.assets.icon" alt="" /> </view>
              </view>
              <view class="operation-btn"> 完成 </view>
              <view class="more-operation"> ... </view>
            </view>
          </view>
          <view class="add-target"> 添加目标 </view>
        </nut-popup>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
// .nut-popup{
//   overflow: unset !important;
// }
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
    // 今日目标列表
    .today-goal {
      position: relative;
      .today-goal-empty {
        margin: 80px 0 0 60px;
      }
      .add-target {
        width: 142px;
        height: 58px;
        background: #60d394;
        border-radius: 15px;
        font-size: 15px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #ffffff;
        line-height: 58px;
        text-align: center;
        margin-top: 90px;
        position: absolute;
        bottom: 30px;
        left: 111.5px;
      }
      .today-goal-main::-webkit-scrollbar {
        width: 0;
      }
      .today-goal-main {
        height: 385px;
        position: absolute;
        overflow-y: scroll;
        left: 20px;
        .today-goal-list:nth-child(1) {
          margin-top: 42px;
        }
        .today-goal-list {
          width: 335px;
          height: 130px;
          background: rgba(224, 235, 230, 1);
          box-shadow: 0px 0px 2px 1px rgba(96, 211, 148, 0.1);
          border-radius: 15px;
          margin: 10px auto 0 auto;

          .title {
            height: 80px;
            border-radius: 15px 15px 0 0;
            background: #fff;
            width: 100%;
            display: flex;
            .title-logo {
              width: 50px;
              height: 50px;
              margin: 15px;
              flex: 2;
            }
            .title-name {
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #333333;
              flex: 8;
              vertical-align: top;
              margin-top: 23px;
            }
            .today-data {
              margin: 41px 31px 0 0;
              font-size: 15px;
              font-family: PingFang-SC-Bold, PingFang-SC;
              font-weight: bold;
              color: #333333;
              image {
                width: 14px;
                height: 18px;
                vertical-align: bottom;
              }
            }
          }
          .operation-btn {
            width: 261px;
            height: 40px;
            background: #ffffff;
            border-radius: 13px;
            margin: 5px 0 5px 15px;
            font-size: 12px;
            font-family: PingFang-SC-Bold, PingFang-SC;
            font-weight: bold;
            color: #60d394;
            line-height: 40px;
            text-align: center;
            display: inline-block;
          }
          .more-operation {
            display: inline-block;
            margin-left: 28px;
            font-size: 28px;
            color: rgba(128, 128, 128, 1);
          }
        }
      }
    }
  }
}
</style>
