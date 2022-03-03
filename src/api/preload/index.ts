import request from "../request";

// 获取用户相关信息
export function getUserInfo(data?: object) {
  return request.post("/platform-user/wx-user/login", { data });
}

// 获取静态资源
export function getAssets(data?: object) {
  return request.get("", { data });
}
