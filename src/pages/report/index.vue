<template>
  <view class="page-container">
    <NavBar>梦琦</NavBar>
    <view class="page-main">
      <view class="sleep-list" v-for="(item, index) in state.getResultList" :key="index">
        <view class="sleep-list-title">
          {{ item.title }}
          <!-- 判断时间显示 -->
          <view class="detail-time" v-if="item.id === 2">
            {{ item.timeShow }}
            <image
              class="detail"
              src="https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png"
              alt=""
              @tap="state.detail"
            />
          </view>
        </view>
        <view class="sleep-list-content">
          <dl
            v-for="(children, childrenIndex) in item.list"
            :key="childrenIndex"
            class="sleep-data"
          >
            <dt
              class="sleep-time"
              :class="item.id === 2 ? 'bed-time' : ''"
              @tap="state.updateTime(item.id)"
            >
              {{ children.time }}
            </dt>
            <dd>{{ children.name }}</dd>
          </dl>
        </view>
      </view>
      <view class="tips"> {{ state.tips }}</view>
    </view>
    <view class="sleep-btn"> 确认</view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
import NavBar from "../../components/NavBar.vue";
import { getResult } from "@/api/report/index";
const state = reactive({
  tips: `你的睡眠效率很高，请继续保持呦！
  祝你有愉快的一天!`,
  getResultList: [],
  sleepList: [
    {
      title: "建议在床时间:  ",
      id: 1,
      timeShow: " - -",
      content: [
        {
          time: "23:00",
          name: "上床时间",
        },
        {
          time: "07:00",
          name: "起床时间",
        },
      ],
    },
  ],
  // 详情
  detail() {
    Taro.redirectTo({
      url: "/pages/report/explain/index",
      success() {},
    });
  },
  // 获取初始化数据
  getResultData() {
    getResult()
      .then((res: any) => {
        state.getResultList = res;
      });
  },
  // 修改时间
  updateTime(data) {
    // 判断 是在床时间
    if (data === 2) {
    }
  },
});
state.getResultData();
</script>

<style lang="scss">
.page-container {
  background: url("https://raw.githubusercontent.com/wangrongding/image-house/master/images202202251452455.png");
  background: rgba(137, 144, 254, 1);
  background-size: 100% auto;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .page-main {
    position: relative;
    height: 100%;
    flex: 1;
    overflow: auto;
    margin: 0 auto;
    .sleep-list {
      background: rgba(98, 104, 212, 1);
      margin: 15px auto 0 auto;
      width: 335px;
      border-radius: 15px;
      padding-bottom: 30px;
      .sleep-list-title {
        font-size: 17px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        border-bottom: 1px solid #eaeaea;
        padding: 12px;

        .detail-time {
          display: inline-block;
          .detail {
            width: 20px;
            height: 20px;
            background: #fff;
            vertical-align: bottom;
            margin-left: 10px;
          }
        }
      }
      .sleep-list-content {
        width: 100%;
        .sleep-data {
          display: inline-block;
          width: 50%;
          text-align: center;
          margin-top: 30px;
          font-family: PingFangSC-Regular, PingFang SC;
          .sleep-time {
            font-size: 15px;
            font-weight: bold;
            color: #ffffff;
          }
          .bed-time {
            width: 100px;
            height: 40px;
            border-radius: 3px;
            border: 1px solid #dddddd;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #fff;
            line-height: 40px;
            margin: 10px auto;
          }
          dd {
            font-size: 12px;
            font-weight: 400;
            color: #fff;
            margin-top: 5px;
          }
        }
      }
    }
    .tips {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #fff;
      text-align: center;
      width: 220px;
      margin: 15px auto 0 auto;
      line-height: 30px;
    }
  }
  .sleep-btn {
    width: 142px;
    height: 58px;
    line-height: 58px;
    text-align: center;
    border-radius: 15px;
    font-size: 15px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #60d394;
    background: #fff;
    margin: 15px auto 30px auto;
  }
}
</style>
