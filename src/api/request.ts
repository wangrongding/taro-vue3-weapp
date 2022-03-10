import Taro from "@tarojs/taro";
import { useStore } from "@/stores/index";
export interface RequestBase {
  // 字符串
  url: string;
  // 常规请求方式，根据项目要求添加
  method: "POST" | "GET" | "PUT" | "DELETE";
  // 每次的参数都是不固定的，因此我们暂时不声明数据类型
  data: any;
  // 下面的requestheader类型,
  header: RequestHeader;
  // 请求是否开启loading层
  loading: boolean;
  // 开启loading层的情况下是否不能点击，全屏遮罩
  mask: boolean;
  // 开启loading层的提示内容
  title: string;
  // 如果请求是否，我是否直接弹出我的提示
  failToast: boolean;
}

export interface RequestHeader {
  // 表示content-type类型必须声明
  "content-type": string;
}

// 定义全局请求地址(baseUrl)
const baseUrl = "http://192.168.1.71:60";

// 暂时考虑 req的属性都会传入
const requestAction = (url, method, options: RequestBase) => {
  const store = useStore();
  const query = { ...{ url, method }, ...options };
  return new Promise((resolve, reject) => {
    if (query.loading) {
      Taro.showLoading({ title: query.title ? query.title : "数据加载中..." });
    }
    Taro.request({
      url: baseUrl + query.url,
      method: method,
      data: query.data,
      header: {
        "content-type": "application/json",
        "platform-auth": "bearer " + store.userInfo.token,
        Authorization: "Basic c2xlZXAtcHJvZ3JhbToxMjM0NTY=",
      },
    })
      .then((res) => {
        // 成功
        if (res.statusCode === 200) {
          resolve(res.data.data);
          // console.log("😀", res.data.data);
        } else {
          // 失败
          reject(res.data);
          // console.log("😡", res.data);
        }
      })
      .catch((err) => {
        // 报错提示
        // console.log("😡😡😡😡");
        if (query.failToast) {
          Taro.showToast({
            title: err,
            icon: "error",
            duration: 1000,
          });
        }
        reject(err);
      })
      .finally(() => {
        if (query.loading) {
          Taro.hideLoading();
        }
      });
  });
};

const request = {
  get(url, options) {
    return requestAction(url, "GET", options);
  },
  post(url, options) {
    return requestAction(url, "POST", options);
  },
};

export default request;
