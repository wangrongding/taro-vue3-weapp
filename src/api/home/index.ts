import request from "../request";
import { RequestBase } from "@/types/index";

// 环境音列表
export function getSoundList(data?: object, options?: RequestBase) {
  return request.get("/mini-program/user-sound/getUserSoundList", { data, ...options });
}
// 亲密值查询
export function getIntimacy(data?: object, options?: RequestBase) {
  return request.get("/mini-program/user-animal/getUserAnimalIntimateValue", { data, ...options });
}
// 查询动物以及蜂蜜信息
export function getAnimalAndHoneyInfo(data?: object, options?: RequestBase) {
  return request.get("/mini-program/user-animal/getAnimalAndHoneyInfo", { data, ...options });
}
// 开始冒险
export function beginAdventure(data?: object, options?: RequestBase) {
  return request.get("/mini-program/user-animal/beginAdventure", { data, ...options });
}
// 冒险结束获取奖励
export function endAdventure(data?: object, options?: RequestBase) {
  return request.get("/mini-program/user-animal/endAdventure", { data, ...options });
}
// 冒险结束 修改动物状态
export function updateUserAnimalStatus(data?: object, options?: RequestBase) {
  return request.put("/mini-program/user-animal/updateUserAnimalStatus", { data, ...options });
}
