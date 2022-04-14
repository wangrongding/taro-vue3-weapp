import request from "../request";

// 心情列表
export function moodStatistics(data?: object) {
  return request.get("/mini-program/data-statistics/moodStatistics", { data });
}

// 睡眠效率统计
export function sleepEfficiencyStatistics(data?: object, options?: object) {
  return request.get("/mini-program/data-statistics/sleepEfficiencyStatistics", { data, ...options });
}

// 睡眠时长统计
export function sleepTimeStatistics(data?: object) {
  return request.get("/mini-program/data-statistics/sleepTimeStatistics", { data });
}

// 在床时间统计
export function bedTimeStatistics(data?: object) {
  return request.get("/mini-program/data-statistics/bedTimeStatistics", { data });
}

// 上床时间统计
export function onTimeStatistics(data?: object) {
  return request.get("/mini-program/data-statistics/onTimeStatistics", { data });
}

// 上床时间统计
export function upTimeStatistics(data?: object) {
  return request.get("/mini-program/data-statistics/upTimeStatistics", { data });
}
