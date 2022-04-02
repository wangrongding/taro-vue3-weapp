// https://pinia.esm.dev/introduction.html
import { defineStore } from "pinia";
import { resourceInfo } from "@/api/preload/index";
import { Assets } from "@/types/index";

export const useAssetsStore = defineStore("assets", {
  state: () => {
    return {
      // assets: {
      //   background: {
      //     guideBackground:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202281550467.png",

      //     // 白天6:00:01-18:00:00，晚上18:00:01-6:00:00
      //     homeBackgroundDay:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202281550467.png",
      //     homeBackgroundNight:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202281550467.png",
      //   },
      //   common: {
      //     logo: "http://12.png",
      //     heartShaped:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203231800806.png",
      //     heartSquare:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203231800806.png",
      //     honey: "http://12.png",
      //     help: "http://12.png",
      //     arrowLeft: "http://12.png",
      //     arrowRight1: "http://12.png",
      //     arrowRight2: "http://12.png",
      //     checkSign: "http://12.png",
      //     dropDown: "http://12.png",
      //     close:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203141751454.png",
      //     pause:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203161451389.png",
      //     play: "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203161514696.png",
      //     stop: "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203161515372.png",
      //     timing:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203161514612.png",
      //   },
      //   home: {
      //     ambientSound:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203071320978.png",
      //     diary:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452915.png",
      //     my: "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452915.png",
      //     record:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452915.png",
      //     statistics:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452915.png",
      //     target:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452915.png",
      //     test: "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452915.png",
      //     intimacyValue:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452915.png",
      //     honeypot:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203071501301.png",
      //     clock: "http://12.png",
      //     popupTarget: {
      //       targetPopupTodayGoal:
      //         "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203141716702.png",
      //     },
      //     popupSound: {
      //       soundPopupSound:
      //         "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203141716702.png",
      //     },
      //     popupTest: {
      //       testPopupTest: "http://12.png",
      //     },
      //     personCenter: {
      //       settingsPetName: "http://12.png",
      //       settingsSleepTime: "http://12.png",
      //       settingsPrivacySettings: "http://12.png",
      //       settingsCloudArchiving: "http://12.png",
      //     },
      //     // ============================================================
      //     today:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203071129104.png",
      //     audio:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203071320978.png",
      //     intimacy:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203221740424.png",
      //     icon: "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452915.png",
      //   },
      //   bear: {
      //     expressionless:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203291154057.gif",
      //     doubt:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203291154057.gif",
      //     happy:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203291154057.gif",
      //     hello:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203291154057.gif",
      //     walk: "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203291154057.gif",
      //     love: "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203291154057.gif",
      //     power:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203291154057.gif",
      //     sleep:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203291154057.gif",
      //     sleepDiary:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203291154057.gif",
      //     placeholder:
      //       "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203291154057.gif",
      //   },
      // },
      assets: {} as Assets,
    };
  },
  getters: {
    // getUserInfo: (state) => state.navigatorInfo,
  },
  actions: {
    // 获取静态资源
    async getAssets() {
      // TODO
      resourceInfo({}, { failToast: true, loading: true, mask: true }).then((res: Assets) => {
        this.assets = res;
      });
    },
  },
});
