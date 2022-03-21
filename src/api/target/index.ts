import request from "../request";

// 获取今日目标
export function targetList(data?: object) {
  return request.get("/mini-program/target/list", { data });
}

// 目标列表
export function getUserTarget(data?: object) {
  return request.get("/mini-program/user-target/getUserTarget", { data });
}

// 添加目标
export function userTarget(data?: object) {
  return request.post("/mini-program/user-target/save", { data });
}

// 完成目标
export function finishTarget(data?: object) {
  return request.post("/mini-program/user-target/finishTarget", { data });
}
