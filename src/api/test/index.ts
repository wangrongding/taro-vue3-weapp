import request from "../request";

// 获取测试列表
export function getSleepList(data?: object) {
  return request.get("/mini-program/sleet-test/getSleepList", { data });
}

// 测试报告
export function getResult(data?: object) {
  return request.get("/mini-program/sleet-test/getResult", { data });
}