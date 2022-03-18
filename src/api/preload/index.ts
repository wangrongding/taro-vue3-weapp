import request from "../request";

// 获取用户相关信息
export function getUserInfo(data?: object, options?: object) {
  return request.post("/platform-user/login/wx", { data, ...options });
}

// 获取静态资源
export function getAssets(data?: object, options?: object) {
  return request.get("", { data, ...options });
}
