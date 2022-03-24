import { createApp } from "vue";
import { createPinia } from "pinia";
import { useStore } from "@/stores/index";
import "./app.scss";

import {
  CircleProgress,
  Badge,
  Picker,
  Popup,
  OverLay,
  Empty,
  Tabs,
  Cell,
  TabPane,
  Progress,
  InputNumber,
  DatePicker,
  CountDown,
  Range,
  Icon,
} from "@nutui/nutui-taro";
import "@nutui/nutui-taro/dist/style.css";

const App = createApp({
  // 生命周期回调——监听小程序初始化。
  async onLaunch(options) {
    const store = useStore();
    // 微信登录
    await store.wxLogin();
  },
  // 生命周期回调——监听小程序启动或切前台。
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
  // 监听系统主题变化
  onThemeChange() {
    // console.log("🚀 onThemeChange");
  },
  // 页面不存在监听函数。
  onPageNotFound() {
    // console.log("🚀 onPageNotFound");
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(createPinia());
App.use(Badge)
  .use(CircleProgress)
  .use(Picker)
  .use(Popup)
  .use(OverLay)
  .use(Empty)
  .use(Tabs)
  .use(TabPane)
  .use(Cell)
  .use(CountDown)
  .use(Range)
  .use(Progress)
  .use(InputNumber)
  .use(DatePicker)
  .use(Icon);

export default App;
