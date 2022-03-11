// https://pinia.esm.dev/introduction.html
import { defineStore } from "pinia";
import Taro from "@tarojs/taro";
import { getUserInfo } from "@/api/preload/index";
export const useStore = defineStore("user", {
  state: () => {
    return {
      userInfo: { token: "" },
      // 临时资源
      assets: {
        // 通用资源
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
          icon: "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452915.png",
        },
      },
    };
  },
  getters: {
    // getUserInfo: (state) => state.navigatorInfo,
  },
  actions: {
    // 设置用户信息
    setUserInfo(data?: any) {
      this.userInfo = data;
    },
    // 用户登录(wx.login->拿到code去后台换取openId)
    async wxLogin() {
      const { code } = await Taro.login();
      // console.log("🚀🚀🚀 / code", code);
      // 根据code获取openId等用户信息
      const info = (await getUserInfo({ code })) as any;
      this.setUserInfo(info);
    },
    // 获取静态资源
    getAssets() {},
  },
});
