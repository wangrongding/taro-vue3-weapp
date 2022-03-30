import request from "../request";

// 睡眠测试题
export function getDiaryTest(data?: object) {
  return request.get("/mini-program/sleet-diary/getSleepTest", { data });
}

// 保存结果
export function saveResult(data?: object) {
  return request.post("/mini-program/sleet-diary/saveResult", { data });
}

// 介绍
export function getSleepGuide(data?: object) {
  return request.get("/mini-program/sleet-diary/getSleepGuide", { data });
}


// 测试
export function getSleepTest(data?: object) {
  return request.get("/mini-program/sleet-test/getSleepTest", { data });
}

// 获取测试报告
export function saveTestResult(data?: object) {
  return request.post("/mini-program/sleet-test/saveResult", { data });
}
