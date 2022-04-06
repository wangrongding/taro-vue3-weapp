// https://pinia.esm.dev/introduction.html
import { defineStore } from "pinia";
import Taro from "@tarojs/taro";
import { getUserInfo } from "@/api/preload/index";
import { UserInfo } from "@/types/index";
export const useStore = defineStore("user", {
  state: () => {
    return {
      userInfo: {} as UserInfo,
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
      const info = (await getUserInfo(
        { code },
        { failToast: true, loading: true, mask: true },
      )) as any;
      this.setUserInfo(info);
    },
  },
});
