import request from "../request";

// 查询用户动物信息
export function getUserAnimalInfo(data?: object) {
  return request.get("/mini-program/user-animal/getUserAnimalInfo", { data });
}

// 查询用户动物信息
export function updateUserAnimalInfo(data?: object) {
  return request.put("/mini-program/user-animal/updateUserAnimalInfo", { data });
}

// 隐私政策
export function getPrivacyPolicy(data?: object) {
  return request.get("/mini-program/privacy-policy/getPrivacyPolicy", { data });
}