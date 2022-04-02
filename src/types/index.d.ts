export interface RequestHeader {
  // 表示content-type类型必须声明
  "content-type": string;
}
export interface RequestBase {
  // 字符串
  url?: string;
  // 常规请求方式，根据项目要求添加
  method?: "POST" | "GET" | "PUT" | "DELETE";
  // 每次的参数都是不固定的，因此我们暂时不声明数据类型
  data?: any;
  // 下面的requestheader类型,
  header?: RequestHeader;
  // 请求是否开启loading层
  loading?: boolean;
  // 开启loading层的情况下是否不能点击，全屏遮罩
  mask?: boolean;
  // 开启loading层的提示内容
  title?: string;
  // 如果请求是否，我是否直接弹出我的提示
  failToast?: boolean;
}

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

// 熊和蜂蜜的状态
export interface BearAndHoney {
  animal: BearInfo;
  honey: HoneyInfo;
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

// 资源信息
export interface Assets {
  common: { [key: string]: string };
  mood: Mood;
  background: Background;
  bear: Bear;
  home: Home;
}
export interface Background {
  guideBackground: string;
  homeBackgroundDay: string;
  homeBackgroundNight: string;
}

export interface Bear {
  expressionless: string;
  doubt: string;
  happy: string;
  hello: string;
  walk: string;
  love: string;
  power: string;
  sleep: string;
  sleepDiary: string;
  placeholder: string;
}

export interface Home {
  ambientSound: string;
  diary: string;
  my: string;
  record: string;
  statistics: string;
  target: string;
  test: string;
  intimacyValue: string;
  honeypot: string;
  clock: string;
  todayGoal: string;
  popupTarget: PopupTarget;
  popupSound: PopupSound;
  popupTest: PopupTest;
  personCenter: PersonCenter;
}

export interface PersonCenter {
  settingsPetName: string;
  settingsSleepTime: string;
  settingsPrivacySettings: string;
  settingsCloudArchiving: string;
}

export interface PopupSound {
  soundPopupSound: string;
}

export interface PopupTarget {
  targetPopupTodayGoal: string;
}

export interface PopupTest {
  testPopupTest: string;
}

export interface Mood {
  veryBad: string;
  bad: string;
  commonly: string;
  happy: string;
  veryHappy: string;
}

