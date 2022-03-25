import request from "../request";

// 获取今日目标
export function userTargetRecordList(data?: object) {
  return request.get("/mini-program/user-target/userTargetRecordList", { data });
}