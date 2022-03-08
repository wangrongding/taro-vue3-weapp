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
      // 根据code获取openId等用户信息
      const info = (await getUserInfo({ code })) as any;
      // todo 后端暂时给出的临时token
      info.token =
        "bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiLmnY7lpKkyIiwicmVhbF9uYW1lIjoi5p2O5aSpMiIsImF2YXRhciI6IiIsImF1dGhvcml0aWVzIjpbImFkbWluIl0sImNsaWVudF9pZCI6InN0dWRlbnQiLCJyb2xlX25hbWUiOiJhZG1pbiIsImxpY2Vuc2UiOiJwb3dlcmVkIGJ5IHBsYXRmb3JteCIsInVzZXJfaWQiOjMsInJvbGVfaWQiOiIxIiwic2NvcGUiOlsiYWxsIl0sImV4cCI6MTY4MjI3MjQyMywianRpIjoiZTRlZWE1OGMtNzFlMy00ZjhhLTkzNmUtMzNlMGU2NTZhNDQ3IiwiYWNjb3VudCI6IjE3NjcxNzgxNjIxIiwidGVuYW50X2NvZGUiOiIwMDAwMDAifQ.kjOotxm_RM1BHRGOd2EDgwaY1nyZUduRRvbxgvBDh9Y";
      this.setUserInfo(info);
    },
    // 获取静态资源
    getAssets() {},
  },
});
