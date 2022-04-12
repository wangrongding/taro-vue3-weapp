<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive } from "vue";
import NavBar from "@/components/NavBar.vue";
import Taro, { InnerAudioContext } from "@tarojs/taro";
import { useAssetsStore } from "@/stores/assets";
import { Ambient } from "@/types/index";
import { useGlobalStore } from "@/stores/global";
const store = useAssetsStore();
const globalStore = useGlobalStore();
const globalAmbient = useGlobalStore().ambient;

const routerParams: Ambient = Taro.getCurrentInstance().router?.params as any;
const state = reactive({
  audioCtx: null as any,
  assets: store.assets.common,
  playStatus: false,
  timeCheckList: [
    { text: "5  分钟", value: 5 },
    { text: "10  分钟", value: 10 },
    { text: "20  分钟", value: 20 },
    { text: "30  分钟", value: 30 },
    { text: "40  分钟", value: 40 },
    { text: "50  分钟", value: 50 },
    { text: "60  分钟", value: 60 },
  ],
  // 时间选择器弹窗
  timeCheckShow: false,
  // 返回
  goBack() {
    Taro.navigateBack({
      delta: 1,
    });
  },
  // 重定向到首页
  redirectTo() {
    if (state.audioCtx) {
      clearPlayer();
    }
    Taro.redirectTo({
      url: "/pages/index/index",
    });
  },
  // 控制音频播放/暂停
  handlePlay() {
    if (state.audioCtx.paused) {
      globalAmbient.playStatus = true;
      state.audioCtx.play();
    } else {
      globalAmbient.playStatus = false;
      state.audioCtx.pause();
    }
  },
  // 暂停
  stop() {
    globalAmbient.musicTime = 0;
    globalAmbient.playStatus = false;
    if (state.audioCtx) {
      state.audioCtx.seek(0);
      state.audioCtx.pause();
    }
  },
  // 设置倒计时
  setCountdown({ selectedValue }) {
    globalAmbient.musicTime = Date.now() + parseInt(selectedValue) * 2 * 1000;
    // globalAmbient.musicTime = Date.now() + parseInt(selectedValue) * 60 * 1000;
    state.timeCheckShow = false;
    globalStore.musicCountDown();
  },
});

// 音频实例属性设置
function player() {
  state.audioCtx.title = routerParams.soundName;
  state.audioCtx.coverImgUrl = routerParams.icon;
  // 设置了 src 之后会自动播放
  state.audioCtx.src = routerParams.music;
  // 设置全局变量,用于状态共享
  globalAmbient.audioCtx = state.audioCtx;
  globalAmbient.musicImg = routerParams.icon;
  globalAmbient.musicName = routerParams.soundName;
  globalAmbient.playStatus = true;
  // 音乐播放结束后继续播放此音乐，循环不停的播放
  state.audioCtx.onEnded(() => {
    player();
  });
  state.audioCtx.onStop(() => {});
  state.audioCtx.onPause(() => {
    globalAmbient.playStatus = false;
    // console.log(routerParams);
  });
  state.audioCtx.onPlay(() => {
    globalAmbient.playStatus = true;
  });
}

// 清除播放器
function clearPlayer() {
  state.audioCtx.stop();
  globalAmbient.audioCtx = null;
  globalAmbient.musicImg = "";
  globalAmbient.musicName = "";
  globalAmbient.musicTime = 0;
  globalAmbient.playStatus = false;
}

// 创建音频
function createAudio() {
  if (globalAmbient.audioCtx) {
    // 列表进来的音乐和已存在的音乐不一致,做切换
    if (routerParams.music !== globalAmbient.audioCtx.src) {
      state.audioCtx = globalAmbient.audioCtx;
      state.audioCtx = Taro.getBackgroundAudioManager();
    } else {
      // 浮窗进来
      state.audioCtx = globalAmbient.audioCtx;
      player();
    }
  } else {
    // 第一次进来
    state.audioCtx = Taro.getBackgroundAudioManager();
  }
  player();
}
onMounted(() => {
  // 创建音频
  createAudio();
});
</script>
<template>
  <view class="play-container">
    <NavBar />
    <view class="operation">
      <view
        @tap="state.redirectTo"
        :style="{
          width: '50px',
          height: '50px',
          backgroundImage: `url(${state.assets.close})`,
          backgroundSize: '100% 100%',
          borderRadius: '50%',
          overflow: 'hidden',
        }"
      />
      <nut-icon
        name="arrow-down2"
        color="#fff"
        size="24"
        @tap="state.goBack"
        style="height: 50px; width: 50px; line-height: 50px; margin-top: 5px"
      />
    </view>

    <view>
      <!-- 音乐图片 -->
      <view
        class="music-img"
        :style="{
          backgroundImage: `url(${routerParams.icon})`,
          width: '150px',
          height: '150px',
          'border-radius': '50%',
          'background-color': 'white',
          backgroundSize: '100% 100%',
          margin: ' 0 auto',
          'margin-top': '50px',
          border: '10px solid #fff',
        }"
      />
      <!-- 音乐名称 -->
      <view
        class="music-name"
        :style="{ color: 'white', textAlign: 'center', fontSize: '22px', marginTop: '20px' }"
      >
        {{ routerParams.soundName }}
      </view>
    </view>
    <view class="play-box">
      <!-- 倒计时 -->
      <nut-countdown
        v-if="globalAmbient.musicTime"
        style="justify-content: center; color: white"
        :end-time="globalAmbient.musicTime"
      />
      <!-- @on-end="state.stop" -->
      <view class="operations-play">
        <!-- 设置倒计时 -->
        <view
          @tap="state.timeCheckShow = true"
          :style="{
            backgroundColor: 'white',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundImage: `url(${state.assets.timing})`,
            backgroundSize: '100% 100%',
          }"
        />
        <!-- 控制播放、暂停 -->
        <view
          @tap="state.handlePlay"
          :style="{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundImage: globalAmbient.playStatus
              ? `url(${state.assets.play})`
              : `url(${state.assets.suspend})`,
            backgroundSize: '100% 100%',
          }"
        />
        <!-- 停止 -->
        <view
          @tap="state.stop"
          :style="{ backgroundColor: 'white', width: '40px', height: '40px' }"
        />
      </view>
    </view>
  </view>
  <nut-picker
    :visible="state.timeCheckShow"
    :columns="state.timeCheckList"
    @confirm="state.setCountdown"
    @close="state.timeCheckShow = false"
  />
</template>
<style lang="scss">
.play-container {
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #60d394ff;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
  align-items: center;

  .operation {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100px;
  }
  .play-box {
    position: absolute;
    bottom: 40px;
    width: 325px;
    height: 150px;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    .operations-play {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100px;
      width: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
