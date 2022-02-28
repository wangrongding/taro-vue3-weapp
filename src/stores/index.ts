// https://pinia.esm.dev/introduction.html
import { defineStore } from "pinia";
import Taro from "@tarojs/taro";
export const useStore = defineStore("counter", {
  state: () => {
    return { userInfo: {} };
  },
  getters: {
    // getUserInfo: (state) => state.navigatorInfo,
  },
  actions: {
    // test(data: any) {},
    async setUserInfo(data?: any) {},
  },
});
