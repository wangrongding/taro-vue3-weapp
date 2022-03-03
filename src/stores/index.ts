// https://pinia.esm.dev/introduction.html
import { defineStore } from "pinia";
import Taro from "@tarojs/taro";
import { getUserInfo } from "@/api/preload/index";
export const useStore = defineStore("counter", {
  state: () => {
    return {
      userInfo: { token: "" },
      //临时资源
      assets: {
        icon: "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452915.png",
        bear1:
          "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202281513430.png",
        bear2:
          "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203021508736.gif",
        bear: "https://raw.githubusercontent.com/wangrongding/image-house/master/images202203031005423.gif",
        background:
          "https://raw.githubusercontent.com/wangrongding/image-house/master/images202202281550467.png",
      },
    };
  },
  getters: {
    // getUserInfo: (state) => state.navigatorInfo,
  },
  actions: {
    //设置用户信息
    setUserInfo(data?: any) {
      this.userInfo = data;
    },
    //用户登录(wx.login->拿到code去后台换取openId)
    async wxLogin() {
      const { code } = await Taro.login();
      //根据code获取openId等用户信息
      const info = (await getUserInfo({ code })) as any;
      //todo 后端暂时给出的临时token
      info.token =
        "bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiLmnY7lpKkiLCJyZWFsX25hbWUiOiLmnY7lpKkiLCJhdmF0YXIiOiIiLCJhdXRob3JpdGllcyI6WyJhZG1pbiJdLCJjbGllbnRfaWQiOiJzdHVkZW50Iiwicm9sZV9uYW1lIjoiYWRtaW4iLCJsaWNlbnNlIjoicG93ZXJlZCBieSBwbGF0Zm9ybXgiLCJ1c2VyX2lkIjoxLCJyb2xlX2lkIjoiMSIsInNjb3BlIjpbImFsbCJdLCJleHAiOjE2ODIyNzIwMzQsImp0aSI6ImIxZjczZDJkLTQzMTUtNGM1OC1iZDBlLTViYzZjYmMwYjlkMyIsImFjY291bnQiOiIxNzY3MTc4MTYyMCIsInRlbmFudF9jb2RlIjoiMDAwMDAwIn0.3XZHtfg3nu6EQr9GRKmZ2fWZ4lp7LVX0zV8yEnx_1_4";
      this.setUserInfo(info);
    },
    //获取静态资源
    getAssets() {},
  },
});
