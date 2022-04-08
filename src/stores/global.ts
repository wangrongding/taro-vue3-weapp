// https://pinia.esm.dev/introduction.html
import { defineStore } from "pinia";
import Taro, { InnerAudioContext } from "@tarojs/taro";
export const useGlobalStore = defineStore("global", {
  state: () => {
    return {
      ambient: {
        musicTime: 0,
        musicName: "",
        musicImg: "",
        playStatus: false,
        // audioCtx: null as unknown as InnerAudioContext,
        audioCtx: null as any,
        // audioCtx: Taro.createInnerAudioContext() as InnerAudioContext,
      },
    };
  },
  getters: {},
  actions: {
    getAssets() {},
  },
});
