// 获取心情
export interface Sleepmood {
  createTime: string,
  createUser: number,
  icon: string,
  id: string,
  isDeleted: number,
  moodName: string,
  moodNumber: number,
  remark: string,
  sort: number,
  status: number,
  updateTime: string,
  updateUser: number,
}

//获取今日目标
export interface GetuserTarget {
  createTime: string,
  createUser: number,
  explain: string,
  honeyCount: string,
  icon: string,
  id: string,
  isDeleted: number,
  remark: string,
  sort: number,
  status: number,
  targetName: string,
  targetTypeId: string,
  updateTime: string,
  updateUser: number,
  userTargetId: string,
}

//个人设置 信息
export interface GetUserAnimalInfo {
  animalExpressionName: string,
  animalName: string,
  animalPortrait: string,
  animalStatus: number,
  animalTypeId: string,
  createTime: string,
  createUser: string,
  honeyValue: string,
  icon: string,
  id: string,
  intimateValue: string,
  isDeleted: number,
  levelName: string,
  maxIntimateValue: string,
  phone: string,
  remark: string,
  status: number,
  tenantCode: string,
  updateTime: string,
  updateUser: number,
}

//隐私设置 / 睡眠限制
export interface GetPrivacyPolicy {
  title: string,
  id: string,
  content: string,
}


//记录
export interface UsertargetRecord {
  createTime: string,
  createUser: string,
  finishStatus: number,
  icon: string,
  id: string,
  isDeleted: number,
  remark: string,
  status: number,
  targetId: string,
  targetName: string,
  tenantCode: string,
  updateTime: string,
  updateUser: number,
}


//报告
export interface GetResultList {
  id: number,
  time: string,
  title: string,
  list: string
}


// 做题介绍  // 测试 列表
export interface GetSleepGuide {
  createTime: string,
  createUser: number,
  explain: string,
  honeyCount: string,
  icon: string,
  id: string,
  isDeleted: number,
  remark: string,
  sort: number,
  status: number,
  title: string,
  updateTime: string,
  updateUser: number,
}

//获取试题
export interface Gettest {
  id: string,
  isOption: number,
  questionType: string,
  sort: number,
  title: string,
  optionList: string,
}
