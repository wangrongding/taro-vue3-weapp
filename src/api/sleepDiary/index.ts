import request from "../request";

// 睡眠测试题
export function getSleepTest(data?: object) {
  return request.get("/mini-program/sleet-test/getSleepTest", { data });
}

// 保存结果
export function saveResult(data?: object) {
  return request.post("/mini-program/sleet-test/saveResult", { data });
}