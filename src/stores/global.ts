// https://pinia.esm.dev/introduction.html
import { defineStore } from "pinia";
export const useGlobalStore = defineStore("global", {
  state: () => {
    return {
      ambient: { musicTime: 0, musicName: "", playStatus: false },
    };
  },
  getters: {},
  actions: {
    getAssets() {},
  },
});
