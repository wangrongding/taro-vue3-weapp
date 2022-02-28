import { createApp } from "vue";
import { createPinia } from "pinia";
import { useStore } from "@/stores/index";
import Taro from "@tarojs/taro";
import "./app.scss";

//微信登录
const WxLogin = () => {
  Taro.login().then((res) => {
    // console.log("🚀login", res.code);
    const store = useStore();
  });
};

const App = createApp({
  // 生命周期回调——监听小程序初始化。
  onLaunch(options) {
    // console.log("🚀 / onLaunch", options);
    WxLogin();
  },
  //生命周期回调——监听小程序启动或切前台。
  onShow(options) {
    // console.log("🚀 / onShow", options);
  },
  // 生命周期回调——监听小程序切后台。
  onHide() {
    // console.log("🚀 / onHide");
  },
  onError(e) {
    // console.error("🚀 onError", e);
  },
  //监听系统主题变化
  onThemeChange() {
    // console.log("🚀 onThemeChange");
  },
  //页面不存在监听函数。
  onPageNotFound() {
    // console.log("🚀 onPageNotFound");
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(createPinia());

export default App;
