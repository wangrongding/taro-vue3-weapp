import request from "../request";

// 环境音列表
export function getSoundList(data?: object) {
  return request.get("/mini-program/user-sound/getUserSoundList", { data });
}
// 亲密值查询
export function getIntimacy(data?: object) {
  return request.get("/mini-program/user-animal/getUserAnimalIntimateValue", { data });
}
