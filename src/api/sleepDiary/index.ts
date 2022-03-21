import request from "../request";

// 睡眠测试题
export function getSleepTest(data?: object) {
  return request.get("/mini-program/sleet-test/getSleepTest", { data });
}
