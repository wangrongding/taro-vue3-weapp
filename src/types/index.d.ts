// 初始化获取的用户信息
export interface UserInfo {
  id: number;
  user_name: string;
  real_name: string;
  token: string;
  email: string;
  account: string;
  tenant_code: string;
  roleId: string;
  headUrl: string;
  openId: string;
}
// 获取的亲密度
export interface Intimate {
  id: string;
  tenantCode: string;
  animalName: string;
  animalStatus: number;
  animalExpressionName: string;
  icon: string;
  animalPortrait: string;
  intimateValue: string;
  honeyValue: string;
  animalTypeId: string;
  remark: string;
  createUser: string;
  createTime: string;
  updateUser: number;
  updateTime: string;
  status: number;
  isDeleted: number;
  levelName: string;
  maxIntimateValue: string;
  phone: string;
}

// 环境音列表项
export interface Ambient {
  id: string;
  tenantCode: string;
  soundId: string;
  remark: string;
  createUser: string;
  createTime: string;
  updateUser: number;
  updateTime: string;
  status: number;
  isDeleted: number;
  soundName: string;
  icon: string;
  music: string;
  explain: string;
}

export interface Data {
  BearInfo: BearInfo;
  HoneyInfo: HoneyInfo;
}

export interface BearInfo {
  animalStatus: number;
  animalExpressionName: string;
  animalIcon: string;
  outStartTime: string;
  totalTime: number;
  reduceTime: number;
}

export interface HoneyInfo {
  honeyValue: string;
  honeyIsShow: number;
  honeyIsFull: number;
}
