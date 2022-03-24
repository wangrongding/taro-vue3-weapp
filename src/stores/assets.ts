// https://pinia.esm.dev/introduction.html
import { defineStore } from "pinia";
import Taro from "@tarojs/taro";
import { getUserInfo } from "@/api/preload/index";
export const useStore = defineStore("assets", {
  state: () => {
    return {
      // TODO通用资源,临时资源
      assets: {
        base: {},
        guide: {
          bear: "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203031005423.gif",
        },
        home: {
          honey:
            "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203071501301.png",
          background:
            "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202281550467.png",
          bear: "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203031005423.gif",
          today:
            "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203071129104.png",
          audio:
            "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203071320978.png",
          intimacy:
            "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203221740424.png",
          icon: "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452915.png",
        },
        intimacy: {
          heart:
            "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203231800806.png",
        },
        ambient: {
          title:
            "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203141716702.png",
          empty:
            "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203151339711.png",
          item: "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203161453639.png",
          icon: "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203151401112.png",
          play: "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203161514696.png",
          pause:
            "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203161451389.png",
          timing:
            "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203161514612.png",
          reset:
            "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203161515372.png",
        },
        target: {
          title:
            "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203141716702.png",
          close:
            "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203141751454.png",
        },
      },
    };
  },
  getters: {
    // getUserInfo: (state) => state.navigatorInfo,
  },
  actions: {
    // 获取静态资源
    getAssets() {
      // TODO
    },
  },
});
