import Taro from "@tarojs/taro";
import { useStore } from "@/stores";
export interface RequestBase {
  url: string; //字符串
  method: "POST" | "GET" | "PUT" | "DELETE"; //常规请求方式，根据项目要求添加
  data: any; // 每次的参数都是不固定的，因此我们暂时不声明数据类型
  header: RequestHeader; // 下面的requestheader类型,
  loading: boolean; // 请求是否开启loading层
  mask: boolean; //开启loading层的情况下是否不能点击，全屏遮罩
  title: string; //开启loading层的提示内容
  failToast: boolean; //如果请求是否，我是否直接弹出我的提示
}

export interface RequestHeader {
  "content-type": string; // 表示content-type类型必须声明
}

//定义全局请求地址(baseUrl)
const baseUrl: string = "http://192.168.1.71:60";

// 暂时考虑 req的属性都会传入
const requestAction = (url, method, options: RequestBase) => {
  const store = useStore();
  let query = { ...{ url, method }, ...options };
  return new Promise((resolve, reject) => {
    if (query.loading) {
      Taro.showLoading({ title: query.title ? query.title : "数据加载中..." });
    }
    Taro.request({
      url: baseUrl + query.url, //暂时留空
      method: method,
      data: query.data,
      header: { "content-type": "application/json", "platform-auth": store.userInfo.token },
    })
      .then((res) => {
        //成功
        if (res.statusCode === 200) {
          resolve(res.data.data);
          // console.log("😀", res.data.data);
        } else {
          //失败
          reject(res.data);
          // console.log("😡", res.data);
        }
      })
      .catch((err) => {
        //报错提示
        // console.log("😡😡😡😡");
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
