import request from "../request";

// 获取环境音列表
export function getAmbientList(data?: object, options?: object) {
  return request.get("/mini-program/user-sound/getUserSoundList", { data, ...options });
}
