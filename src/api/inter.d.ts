export interface RequestBase {
  url: string; //字符串
  method: "POST" | "GET"; //常规请求方式，根据项目要求添加
  data: any; // 每次的参数都是不固定的，因此我们暂时不声明数据类型
  header: RequestHeader; // 下面的requestheader类型,
  loading: boolean; // 请求是否开启loading层
  mask: boolean; //开启loading层的情况下是否不能点击，全屏遮罩
  title: string; //开启loading层的提示内容
  failToast: boolean; //如果请求是否，我是否直接弹出我的提示
}

export interface RequestHeader {
  "content-type": string; // 表示content-type类型必须声明
  token?: string; // token可能不存在，如果存在就是字符串类型
}

// 遍历RequestBase中所有key，都改为可选参，这样我们就只管维护RequestBase
type Request = {
  [K in keyof RequestBase]?: RequestBase[K];
};
