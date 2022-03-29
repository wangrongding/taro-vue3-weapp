import request from "../request";

// 获取今日目标
export function getSleepList(data?: object) {
  return request.get("/mini-program/sleet-test/getSleepList", { data });
}

