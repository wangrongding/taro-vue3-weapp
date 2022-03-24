<script setup lang="ts">
import { onMounted, reactive } from "vue";
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
    { lable: "无限", value: 9999999 },
    { lable: "5  分钟", value: 5 },
    { lable: "10  分钟", value: 10 },
    { lable: "20  分钟", value: 20 },
    { lable: "30  分钟", value: 30 },
    "无限",
    "5",
    "10",
    "20",
    "30",
  ],
  end: 0,
  timeCheckShow: false,
  goBack() {
    Taro.navigateBack({
      delta: 1,
    });
  },
  redirectTo() {
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
    audioCtx.onError(() => {
      // state.onError(err);
    });
  },
  // 控制音频播放/暂停
  handlePlay() {
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
    audioCtx.stop();
  },
  // 播放回调
  onPlay() {},
  // 设置倒计时
  setCountdown(val: string) {
    state.end = Date.now() + parseInt(val) * 1000;
    state.timeCheckShow = false;
  },
});
onMounted(() => {
  // 创建音频
  state.createAudio();
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
      <nut-countdown
        v-if="state.end"
        style="justify-content: center; color: white"
        :end-time="state.end"
        @update:modelValue="state.onPlay"
      />
      <!-- <nut-countdown :end-time="state.countdown" /> -->
      <view class="operations-play">
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
        <view
          @tap="state.stop"
          :style="{ backgroundColor: 'white', width: '40px', height: '40px' }"
        />
      </view>
    </view>
  </view>
  <nut-picker
    :visible="state.timeCheckShow"
    :list-data="state.timeCheckList"
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
