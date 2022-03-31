<template>
  <view class="page-container">
    <NavBar style="color: #000">梦琦</NavBar>
    <view class="page-main">
      <view class="meInformation">
        <image class="me-logo" :src="state.getUserAnimalInfoObj.animalPortrait" alt="" />
        <span class="me-name">{{ state.getUserAnimalInfoObj.animalName }}</span>
      </view>
      <view class="elastic-box">
        <view class="me-content">
          <view
            class="setting"
            v-for="(item, index) in state.list"
            :key="index"
            @tap="state.setting(item)"
          >
            <image class="me-icon" :src="item.img" alt="" />
            <span class="me-title">{{ item.title }}</span>
            <image class="me-next" :src="item.icon" alt="" />
            <span class="cloudArchiving">{{ item.cloudArchiving }}</span>
          </view>
          <!-- <button
          type="primary"
          openType="getPhoneNumber"
          @getphonenumber="getPhoneNumber"
        >
          微信绑定手机号登录
        </button> -->
        </view>
      </view>

      <view class="close">
        <image :src="state.assets.icon" alt="" @tap="state.close" />
      </view>
      <!-- 更改宠物名字弹框 -->
      <view class="change-name" v-if="state.show === true">
        <view class="pets-name">
          <view class="pets-name-title">
            <span class="pets-title">宠物名字</span>
            <span class="pets-name-close" @tap="state.petsClose"> X </span>
          </view>

          <view class="pets-name-text">
            <input
              type="text"
              v-model="state.name"
              max-length="10"
              placeholder="请输入宠物名字"
            >
          </view>
          <view class="pets-name-btn" @tap="state.changeName"> 确认 </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
import NavBar from "../../components/NavBar.vue";
import { useStore } from "@/stores/assets";
import { getUserAnimalInfo, updateUserAnimalInfo } from "@/api/me/index";
import { GetUserAnimalInfo } from "@/types/type";
const store = useStore();
const state = reactive({
  assets: store.assets.home,
  getUserAnimalInfoObj: {} as GetUserAnimalInfo,
  name: "",
  show: false,
  list: [
    {
      img: store.assets.home.icon,
      title: "宠物名字",
      icon: store.assets.home.icon,
    },
    {
      img: store.assets.home.icon,
      title: "睡眠时间",
      icon: store.assets.home.icon,
    },
    {
      img: store.assets.home.icon,
      title: "隐私政策",
      icon: store.assets.home.icon,
    },
    {
      img: store.assets.home.icon,
      title: "云存档",
      cloudArchiving: "未存档",
    },
  ],
  setting(data: { img: string; title: string; icon: string; cloudArchiving?: undefined; } | { img: string; title: string; cloudArchiving: string; icon?: undefined; }) {
    if (data.title === "宠物名字") {
      state.show = true;
    } else if (data.title === "睡眠时间") {
      Taro.navigateTo({
        url: "/pages/report/index?name=setting",
      });
    } else if (data.title === "隐私政策") {
      Taro.navigateTo({
        url: "/pages/me/privacyPolicy",
      });
    }
  },
  // 用户动物信息
  getUserAnimalInfoData() {
    getUserAnimalInfo()
      .then((res: GetUserAnimalInfo) => {
        state.getUserAnimalInfoObj = res;
      });
  },
  // 修改名字
  updateUserAnimalInfoData(animalName: string) {
    let params = {
      animalName: animalName,
      id: state.getUserAnimalInfoObj.id,
    };
    updateUserAnimalInfo(params)
      .then(() => {
        state.show = false;
        state.getUserAnimalInfoData();
      });
  },
  changeName() {
    if (state.name === "") return;
    if (state.name.length > 10) {
      return Taro.showToast({
        title: "名字不能超出10个字符",
        icon: "none",
        duration: 1000,
      });
    }
    state.updateUserAnimalInfoData(state.name);
  },
  // 关闭设置
  close() {
    Taro.redirectTo({
      url: "/pages/index/index",
      success() {},
    });
  },
  // 关闭修改宠物名字弹框
  petsClose() {
    state.show = false;
  },
});

function getPhoneNumber() {
  // console.log(JSON.stringify(e));
  // console.log(`加密算法的初始向量:${e.detail.iv}`);
  // console.log(`包括敏感数据在内的完整用户信息的加密数据:${e.detail.encryptedData}`);
  Taro.checkSession({
    success: function () {
      // console.log(1)
    },
  });
}
state.getUserAnimalInfoData();
</script>

<style lang="scss">
.page-container {
  background: rgba(243, 245, 249, 1);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .page-main {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    // logo 和名字
    .meInformation {
      margin-top: 27px;
      text-align: center;
      .me-logo {
        width: 105px;
        height: 120px;
        background: red;
      }
      .me-name {
        font-size: 22px;
        font-family: PingFang-SC-Bold, PingFang-SC;
        font-weight: bold;
        color: #333333;
        margin-top: 10px;
      }
    }
    // 主要列表
    .elastic-box {
      flex: 1;
      .me-content {
        width: 335px;
        background: #ffffff;
        box-shadow: 0px 0px 2px 1px rgba(96, 211, 148, 0.1);
        border-radius: 15px;
        margin: 20px auto 0 auto;
        .setting:nth-child(1) {
          padding-top: 25px;
        }
        .setting {
          margin-left: 20px;
          padding-bottom: 20px;
          display: flex;
          .me-icon {
            background: red;
            width: 30px;
            height: 30px;
          }
          .me-title {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            flex: 1;
            margin: 6px 0 0 15px;
          }
          .me-next {
            width: 6px;
            height: 14px;
            margin-top: 7px;
          }
          .cloudArchiving {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            margin: 7px 20px 0 0;
          }
        }
      }
    }

    // 关闭按钮
    .close {
      width: 100%;
      text-align: center;
      margin-bottom: 30px;
      image {
        width: 50px;
        height: 58px;
      }
    }
    // 弹框
    .change-name {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      .pets-name {
        width: 291px;
        height: 196px;
        background: #ffffff;
        border-radius: 15px;
        margin: 50% 0 0 42px;
        .pets-name-title {
          display: flex;
          .pets-title {
            font-size: 17px;
            font-family: PingFang-SC-Bold, PingFang-SC;
            font-weight: bold;
            color: #333333;
            text-align: center;
            padding: 15px 0;
            flex: 1;
            margin-left: 20px;
          }
          .pets-name-close {
            margin: 15px 10px 0 0;
            font-size: 16px;
          }
        }

        .pets-name-text {
          width: 259px;
          height: 35px;
          margin-left: 17px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          border-bottom: 1px solid #60d394;
          padding-top: 15px;
        }
        .pets-name-btn {
          width: 120px;
          height: 50px;
          background: #60d394;
          border-radius: 15px;
          font-size: 15px;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #ffffff;
          text-align: center;
          line-height: 50px;
          margin: 33px auto 0 auto;
        }
      }
    }
  }
}
</style>
