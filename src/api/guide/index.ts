import request from "../request";

// 是否是新用户
export function getGuide(data?: object, options?: object) {
  return request.get("/mini-program/userExt/getGuide", { data , ...options });
}

// 动物名字
export function saveName(data?: object) {
  return request.post("/mini-program/user-animal/saveName", { data });
}

// 用户名字
export function saveUserName(data?: object) {
  return request.post("/platform-user/wx-user/saveUserName", { data });
}

// 获取亲密值
export function updateByAnimalId(data?: object) {
  return request.post("/mini-program/user-animal-intimate/updateByAnimalId", { data });
}

// 作息时间设置
export function saveRest(data?: object, options?: object) {
  return request.post("/mini-program/userExt/saveRest", { data , ...options });
}

// 授权
export function wxRegistry(data?: object) {
  return request.post("/platform-user/wx-user/wxRegistry", { data });
}

// 获取心情列表
export function sleepMood(data?: object) {
  return request.get("/mini-program/sleep-mood/list ", { data });
}
// 选择心情
export function userMood(data?: object, options?: object) {
  return request.post("/mini-program/user-mood/save", { data, ...options });
}

// 心情 详情
export function getUserMood(data?: object) {
  return request.get("/mini-program/user-mood/getUserMood", { data });
}

// 订阅消息通知
export function template(data?: object) {
  return request.get("/mini-program/template/list", { data });
}