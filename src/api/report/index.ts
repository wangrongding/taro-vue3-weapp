import request from "../request";

// 睡眠测试题
export function getResult(data?: object) {
  return request.get("/mini-program/sleet-diary/getResult", { data });
}

// 睡眠限制
export function getDiaryLimit(data?: object) {
  return request.get("/mini-program/sleet-diary/getDiaryLimit", { data });
}
