import request from "../request";

// 保存能量值
export function saveHoney(data?: object) {
  return request.post("/mini-program/user-animal/saveHoney", { data });
}
