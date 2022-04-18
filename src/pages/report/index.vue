<template>
  <view class="page-container">
    <NavBar />
    <view class="page-main">
      <view
        class="sleep-list"
        v-for="(item, index) in (state.getResultList as GetResultList[])"
        :key="index"
      >
        <view class="sleep-list-title">
          {{ item.title }}
          <!-- 判断时间显示 title -->
          <view class="detail-time" v-if="item.title === '建议在床时间：'">
            <text>{{ item.time }}</text>
            <image
              class="detail"
              :src="state.assets.common.help"
              alt=""
              @tap="state.detail"
            />
          </view>
        </view>
        <!-- 循环报告列表 -->
        <view class="sleep-list-content">
          <dl
            v-for="(children, childrenIndex) in (item.list as Report)"
            :key="childrenIndex"
            class="sleep-data"
          >
            <dt
              class="sleep-time"
              :class="item.title === '建议在床时间：' ? 'bed-time' : ''"
              @tap="state.updateTime(item, children)"
            >
              <view :class="children.time < 85 ? 'sleep-text-color' : ''">
                {{ children.time }}
                <text v-if="children.name === '睡眠效率' || children.name === '平均睡眠效率'">
                  %
                </text>
              </view>
            </dt>
            <dd>{{ children.name }}</dd>
          </dl>
        </view>
      </view>
      <view class="tips"> {{ state.tips }}</view>
      <Bedtime
        :visible="state.show"
        @timeTable="timeTable"
        @close="close"
        :cancel-id="state.cancelId"
      />
    </view>
    <view class="sleep-btn" @tap="state.sleepBtn"> 确认</view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Taro from "@tarojs/taro";
import NavBar from "../../components/NavBar.vue";
import { getResult } from "@/api/report/index";
import { saveRest } from "@/api/guide/index";
import Bedtime from "../components/Bedtime.vue";
import { GetResultList } from "@/types/type";
import { useAssetsStore } from "@/stores/assets";
const store = useAssetsStore();
interface Report {
  name: string;
  time: string;
}
const state = reactive({
  assets: store.assets,
  tips: "",
  getResultList: [],
  show: false,
  settingTime: {} as Report,
  time: "",
  jumpRoute: "",
  cancelId: 0,
  name: {
    list: [] as Report[],
  },
  // 详情
  detail() {
    Taro.redirectTo({
      url: "/pages/report/explain/index",
    });
  },
  // 获取初始化数据
  getResultData() {
    getResult().then((res: any) => {
      state.getResultList = res.list;
      processingData();
      state.tips = res.title;
    });
  },
  // 修改时间
  updateTime(item: { title: string }, children: { name: string; time: string }) {
    state.settingTime = children;
    state.settingTime.name === "上床时间" ? (state.cancelId = 1) : (state.cancelId = 2);
    // 判断 是在床时间
    if (item.title === "建议在床时间：") state.show = true;
  },
  // 点击确定 并修改时间
  sleepBtn() {
    let params = {
      sleepTime: state.name.list[0].time,
      weekTime: state.name.list[1].time,
    };
    saveRest(params).then(() => {
      // setting 跳转回设置
      state.jumpRoute === "setting"
        ? Taro.redirectTo({
          url: "/pages/me/index",
        })
        : Taro.redirectTo({
          url: "/pages/index/index",
        });
    });
  },
});
// 设置时间
function timeTable(data: any) {
  if (state.settingTime.name === "上床时间") state.settingTime.time = data;
  if (state.settingTime.name === "起床时间") state.settingTime.time = data;
  state.show = false;
}
function close() {
  state.show = false;
}
// 换算成number类型 进行判断  处理数据格式
function processingData() {
  state.getResultList.forEach((item: { title: string; list: Report[]; time: string }) => {
    state.name = item;
    item.list.forEach((children: { name: string; time: string }) => {
      if (children.name === "睡眠效率" || children.name === "平均睡眠效率") {
        children.time = Number(children.time).toFixed(1);
      }
    });
    if (item.title === "建议在床时间：" && item.time === "") item.time = "--";
  });
}
state.getResultData();
// 获取传参
state.jumpRoute = Taro.getCurrentInstance().router?.params.name as any;
</script>

<style lang="scss">
.page-container {
  background: rgba(137, 144, 254, 1);
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
            vertical-align: bottom;
            margin-left: 10px;
          }
          text {
            color: rgba(255, 155, 133, 1);
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
          .sleep-text-color {
            color: rgba(255, 155, 133, 1);
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
