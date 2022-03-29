<script setup lang="ts">
import { onMounted, onBeforeUnmount, reactive } from "vue";
import NavBar from "@/components/NavBar.vue";
import Taro from "@tarojs/taro";
import { useStore } from "@/stores/assets";
const store = useStore();

let audioCtx: any = null;

const state = reactive({
  file: "play",
  assets: store.assets.ambient,
  playStatus: false,
  timeCheckList: [
    { text: "5  分钟", value: 5 },
    { text: "10  分钟", value: 10 },
    { text: "20  分钟", value: 20 },
    { text: "30  分钟", value: 30 },
    { text: "40  分钟", value: 30 },
    { text: "50  分钟", value: 30 },
    { text: "60  分钟", value: 30 },
  ],
  end: 0,
  handleEndTime: 0,
  timeCheckShow: false,
  goBack() {
    Taro.navigateBack({
      delta: 1,
    });
  },
  redirectTo() {
    audioCtx && state.handlePlay();
    Taro.redirectTo({
      url: "/pages/index/index",
    });
  },
  // 创建音频上下文
  createAudio() {
    audioCtx = Taro.createInnerAudioContext();
    audioCtx.src = "https://storage.360buyimg.com/jdrd-blog/27.mp3";
    audioCtx.autoplay = false;
    audioCtx.loop = true;
    audioCtx.onPlay(() => {
      state.onPlay();
    });
    audioCtx.onError(() => {});
  },
  // 控制音频播放/暂停
  handlePlay() {
    // console.log("🚀🚀🚀 / state.end", state.end);
    // return;
    if (audioCtx.paused) {
      state.playStatus = true;
      // console.log("播放", audioCtx, audioCtx.paused);
      audioCtx.play();
    } else {
      state.playStatus = false;
      // console.log("暂停", audioCtx, audioCtx.paused);
      audioCtx.pause();
    }
  },
  // 暂停
  stop() {
    state.end = 0;
    audioCtx && audioCtx.stop();
    state.playStatus = false;
  },
  // 播放回调
  onPlay() {},
  // 设置倒计时
  setCountdown({ selectedValue }) {
    state.end = Date.now() + parseInt(selectedValue) * 60 * 1000;
    state.timeCheckShow = false;
    audioCtx && audioCtx.play();
    state.playStatus = true;
  },
});
onMounted(() => {
  // 创建音频
  state.createAudio();
});
onBeforeUnmount(() => {
  // console.log("onHide");
  // audioCtx && state.handlePlay();
});
</script>
<template>
  <view class="play-container">
    <NavBar>首页</NavBar>
    <view class="operation">
      <view
        @tap="state.redirectTo"
        :style="{
          width: '50px',
          height: '50px',
          backgroundImage: `url(${state.assets.icon})`,
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
    <!-- 音乐图片 -->
    <view
      class="music-img"
      :style="{
        backgroundImage: `url(${state.assets.item})`,
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
    <view class="play-box">
      <!-- 倒计时 -->
      <nut-countdown
        v-if="state.end"
        style="justify-content: center; color: white"
        :end-time="state.end"
        @on-end="state.stop"
      />
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
            backgroundImage: state.playStatus
              ? `url(${state.assets.pause})`
              : `url(${state.assets.play})`,
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

  .operation {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    height: 100px;
  }
  .play-box {
    width: 335px;
    position: absolute;
    bottom: 40px;
    height: 100px;
    .operations-play {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100px;
      // padding: 0 20px;
      margin: 0 auto;
      box-sizing: border-box;
    }
  }
}
</style>
