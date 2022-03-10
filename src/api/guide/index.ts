import request from "../request";

// 是否是新用户
export function getGuide(data?: object) {
  return request.get("/mini-program/userExt/getGuide", { data });
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

// 授权
export function wxRegistry(data?: object) {
  return request.post("/platform-user/wx-user/wxRegistry", { data });
}