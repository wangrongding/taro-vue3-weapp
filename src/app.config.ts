export default {
  pages: [
    // 初始页面
    "pages/guide/index",
    // 发现动物
    "pages/guide/findAnimals/index",
    // 新手引导
    "pages/guide/guidingProcess/index",
    // 首页
    "pages/index/index",
    // 环境音播放页
    "pages/play/index",
    // 目标
    "pages/target/index",
    // 睡眠日记首页
    "pages/sleepDiary/index",
    // 睡眠日记测试题
    "pages/sleepDiary/testQuestions/index",
    // 睡眠日记报告
    "pages/report/index",
    // 睡眠日记解释
    "pages/report/explain/index",
    // 记录
    "pages/record/index",
    // 我的
    "pages/me/index",
    // 隐私政策
    "pages/me/privacyPolicy",
    // 测试报告
    "pages/test/report",
    // 统计
    "pages/dashboard/index",
    // 回归页面
    "pages/goback/index",
  ],
  requiredBackgroundModes: ["audio"],
  window: {
    backgroundTextStyle: "light",
    // navigationBarBackgroundColor: "#fff",
    // navigationBarTitleText: "",
    // navigationBarTextStyle: "black",
    navigationStyle: "custom",
  },
};
