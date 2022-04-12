// https://pinia.esm.dev/introduction.html
import { defineStore } from "pinia";
export const useGlobalStore = defineStore("global", {
  state: () => {
    return {
      ambient: {
        musicTime: 0,
        musicName: "",
        musicImg: "",
        playStatus: false,
        audioCtx: null as any,
        musicParams: "",
        timer: 0 as number,
      },
    };
  },
  getters: {},
  actions: {
    // 设置用户信息
    setUserInfo(data?: any) {
      this.userInfo = data;
    },
    // 背景音乐倒计时
    musicCountDown() {
      clearInterval(this.ambient.timer);
      this.ambient.timer = null;
      // 倒计时暂停
      this.ambient.timer = setInterval(() => {
        let countDown = Math.round((this.ambient.musicTime - Date.now()) / 1000);
        this.ambient.musicTime--;
        if (countDown < 0) {
          clearInterval(this.ambient.timer);
          this.ambient.timer = null;
          this.ambient.musicTime = 0;
          this.ambient.playStatus = false;
          this.ambient.audioCtx.pause();
        }
      }, 1000);
    },
  },
});
