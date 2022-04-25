import Taro from "@tarojs/taro";
import { useStore } from "@/stores/index";
import { RequestBase } from "@/types/index";

// 明伟本地接口地址
// const localUrl = "http://192.168.1.71:60";
// 正理本地接口地址
const localUrl = "http://192.168.1.114:60";
// const localUrl = "http://39.105.104.8:60";
// 远程接口地址
const remoteUrl = process.env.API_ENV ? localUrl : "http://39.105.104.8:60";
// 定义全局请求地址(baseUrl)
const baseUrl = process.env.NODE_ENV === "production" ? remoteUrl : localUrl;
// 暂时考虑 req的属性都会传入
const requestAction = (url, method, options: RequestBase) => {
  const store = useStore();
  const query = { ...{ url, method }, ...options };
  return new Promise((resolve, reject) => {
    if (query.loading) {
      Taro.showLoading({ title: query.title ? query.title : "加载中...", mask: query.mask });
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
        if (res.statusCode === 200) {
          // 接口返回成功的数据
          if (res.data.code === 200) {
            resolve(res.data.data);
          } else {
            Taro.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 2000,
            });
            reject(res.data.msg);
          }
        } else {
          // 失败
          if (query.failToast) {
            Taro.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 2000,
            });
          }
          reject(res.data);
        }
      })
      .catch((error) => {
        // 报错提示
        Taro.showToast({
          title: error.errMsg,
          icon: "error",
          duration: 2000,
        });
        reject(error);
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
  put(url, options) {
    return requestAction(url, "PUT", options);
  },
};

export default request;
