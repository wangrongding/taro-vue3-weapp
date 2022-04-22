<template>
  <view class="page-container">
    <NavBar style="color: #000" />
    <view class="target-main">
      <nut-tabs v-model="state.tab1value" class="target-tab">
        <template #titles>
          <view
            class="nut-tabs__titles-item"
            @click="state.tab1value = item.dictKey - 1"
            :class="{ actives: state.tab1value === item.dictKey - 1 }"
            :key="item.dictKey"
            v-for="item in state.dictList"
          >
            <nut-icon v-if="item.justIcon" :name="state.tab1value === item.dictKey - 1 ? item.oppositeIcon :item.justIcon" />
            <span
              class="nut-tabs__titles-item__text"
              :class="{ actives: state.tab1value === item.dictKey - 1 }"
            >{{ item.dictValue }}</span>
            <span class="nut-tabs__titles-item__line" />
          </view>
          <image
            class="close"
            :src="state.assets.common.close"
            alt=""
            @tap="addTodayTarget('close')"
          />
        </template>
        <view v-for="(item, index) in state.targetList" :key="index">
          <nut-tabpane :pane-key="item.dictKey - 1">
            <view
              v-for="item1 in item.list"
              :key="item1.dictKey"
              class="target-content"
              @tap="addTarget(item1)"
            >
              <image
                class="target-image"
                :src="item1.active ? state.assets.common.checkSign : item1.icon"
                alt=""
              />
              <span class="target-title">{{ item1.targetName }}</span>
              <span class="target-energy-value">{{ item1.honeyCount }}</span>
              <image class="target-energy-image" :src="state.assets.common.honey" alt="" />
            </view>
          </nut-tabpane>
        </view>
      </nut-tabs>
      <view
        class="add-today-target"
        :class="state.active ? 'add-today-target-check' : 'add-today-target'"
        @tap="addTodayTarget('')"
      >
        添加目标
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import NavBar from "../../components/NavBar.vue";
import Taro from "@tarojs/taro";
import { targetList, userTarget } from "@/api/target/index";
import { useAssetsStore } from "@/stores/assets";
const store = useAssetsStore();
interface DictList {
  dictKey: number;
  dictValue: string;
  icon: string;
}
const state = reactive({
  assets: store.assets,
  tab1value: 0,
  dictList: [] as DictList[],
  targetList: [] as any,
  addTargetCheckd: [] as any,
  active: false,
});
// 选择目标
function addTarget(data: { active: boolean; id: string }) {
  data.active = !data.active;
  if (data.active === true) {
    state.addTargetCheckd.push(data.id);
  } else {
    let index = state.addTargetCheckd.indexOf(data.id);
    if (index > -1) {
      state.addTargetCheckd.splice(index, 1);
    }
  }
  state.active = state.addTargetCheckd.length !== 0 ? true : false;
}
// 关闭、添加目标
function addTodayTarget(data: string) {
  let params = {
    targetIds: state.addTargetCheckd,
  };
  if (state.addTargetCheckd.length === 0) if(data === "") return;
  // 判断是点击关闭还是添加目标
  if(data !== "close") {
    userTarget(params).then(()=>{
      Taro.redirectTo({
        url: "/pages/index/index",
      });
    });
  } else {
    Taro.redirectTo({
      url: "/pages/index/index",
    });
  }

}
// 获取列表
function targetListData() {
  targetList().then((res: { dictList: DictList[]; targetList: any }) => {
    state.dictList = res.dictList;
    state.targetList = res.targetList;
  });
}
//    ------初始化 -------
targetListData();
</script>

<style lang="scss">
.page-container {
  text-align: center;
  margin: 0 auto;
  background-color: #f3f5f9;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .target-main {
    margin: 21px 5px 5px 5px;
    margin-left: 20px;
    width: 335px;
    // tab表格
    .target-tab {
      .nut-tabs__titles {
        width: 265px;
        margin-left: -15px;
      }
      .nut-tabs__titles-item {
        width: 83px;
        height: 31px;

        border-radius: 8px;
        border: 1px solid #ff9b85;
        margin-left: 10px;
        background: #ff9b85;
      }
      .nut-tabs__titles-item.actives {
        background: #ffffff;
      }
      .nut-tabs__titles-item__text {
        padding-left: 5px;
        color: #ffffff;
      }
      .nut-tabs__titles-item__text.actives {
        color: #ff9b85;
      }
      .nut-tabpane::-webkit-scrollbar {
        width: 0;
      }
      @media screen and (min-width: 400px) {
        .nut-tabpane {
          height: 445px;
        }
      }
      @media screen and (max-width: 400px) {
        .nut-tabpane {
          height: 550px;
        }
      }
      .nut-tabpane {
        width: 335px;
        box-shadow: 0px 0px 2px 1px rgba(96, 211, 148, 0.1);
        background: #f3f5f9;
        padding: 0;
        overflow-y: scroll;
      }

      .target-content:nth-child(1) {
        margin-top: 0;
      }
      .close {
        position: absolute;
        width: 38px;
        right: 22px;
        height: 38px;
        margin-top: -3px;
      }
      .target-content {
        display: flex;
        margin-top: 10px;
        background: #ffffff;
        padding: 20px 25px;
        border-radius: 15px;
        .target-image {
          width: 55px;
          height: 50px;
        }
        .target-title {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          margin: 8px 0 0 19px;
          width: 196px;
          text-align: left;
        }
        .target-energy-value {
          font-size: 15px;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #333333;
          margin: 19px 0 0 19px;
        }
        .target-energy-image {
          width: 14px;
          height: 18px;
          margin: 20px 0 0 5px;
        }
      }
    }
    .add-today-target {
      width: 142px;
      height: 58px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 15px;
      line-height: 58px;
      margin: 17px auto;
      font-size: 15px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #ffffff;
    }
    .add-today-target-check {
      background: #60d394;
    }
  }
}
</style>
