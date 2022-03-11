<template>
  <view class="page-container">
    <NavBar style="color: #000">梦琦</NavBar>
    -------------------------
    <view class="target-main">
      <nut-tabs v-model="state.tab1value" class="target-tab">
        <template #titles>
          <div
            class="nut-tabs__titles-item"
            @click="state.tab1value = item.paneKey"
            :class="{ actives: state.tab1value == item.paneKey }"
            :key="item.paneKey"
            v-for="item in state.list6"
          >
            <nut-icon v-if="item.icon" :name="item.icon" />
            <span
              class="nut-tabs__titles-item__text"
              :class="{ actives: state.tab1value == item.paneKey }"
            >{{ item.title }}</span>
            <span class="nut-tabs__titles-item__line" />
          </div>
        </template>
        <view v-for="(item, index) in state.list" :key="index">
          <nut-tabpane :pane-key="item.paneKey">
            <view v-for="item1 in item.list1" :key="item1.paneKey" class="target-content">
              <image class="target-image" :src="item1.img" alt="" />
              <span class="target-title">{{ item1.content }}</span>
              <span class="target-energy-value">{{ item1.energyValue }}</span>
              <image class="target-energy-image" :src="item1.img" alt="" />
            </view>
          </nut-tabpane>
        </view>
      </nut-tabs>
      <view class="add-today-target"> 添加目标 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import NavBar from "../../components/NavBar.vue";
const state = reactive({
  tab1value: "0",
  list6: [
    {
      title: "日程",
      paneKey: "0",
      icon: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",

      list: [
        {
          content: "避免白天打盹，如需打盹不超过30分钟",
        },
      ],
    },
    {
      title: "环境",
      paneKey: "1",
      icon: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
    },
    {
      title: "想法",
      paneKey: "2",
      icon: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
    },
  ],
  list: [
    {
      paneKey: "0",
      list1: [
        {
          img: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
          content: "避免白天打盹，如需打盹不超过30分钟",
          energyValue: 5,
          energyIcon: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
        },
        {
          img: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
          content: "避免白天打盹，如需打盹不超过30分钟",
          energyValue: 5,
          energyIcon: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
        },
        {
          img: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
          content: "避免白天打盹，如需打盹不超过30分钟",
          energyValue: 5,
          energyIcon: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
        },
        {
          img: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
          content: "避免白天打盹，如需打盹不超过30分钟",
          energyValue: 5,
          energyIcon: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
        },
        {
          img: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
          content: "避免白天打盹，如需打盹不超过30分钟",
          energyValue: 5,
          energyIcon: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
        },
        {
          img: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
          content: "避免白天打盹，如需打盹不超过30分钟",
          energyValue: 5,
          energyIcon: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
        },
      ],
    },
    {
      paneKey: "1",
      list1: [
        {
          img: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
          content: "避免1白天打盹，如需打盹不超过30分钟",
          energyValue: 5,
          energyIcon: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
        },
      ],
    },
    {
      paneKey: "2",
      list1: [
        {
          img: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
          content: "避免1白天打盹，如需打盹不超过30分钟",
          energyValue: 5,
          energyIcon: "https://gitee.com/Leagle/picture-bed/raw/master/20220302140457.png",
        },
      ],
    },
  ],
});
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
    margin: 5px;
    margin-left: 20px;
    width: 335px;
    // tab表格
    .target-tab {
      .nut-tabs__titles {
        width: 265px;
        margin-left: -20px;
      }
      .nut-tabs__titles-item {
        width: 88px;
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
      .nut-tabpane {
        width: 335px;
        box-shadow: 0px 0px 2px 1px rgba(96, 211, 148, 0.1);
        background: #f3f5f9;
        padding: 0;
        height: 445px;
        overflow-y: scroll;
      }

      .target-content:nth-child(1) {
        margin-top: 0;
      }
      .target-content {
        display: flex;
        margin-top: 10px;
        background: #ffffff;
        padding: 20px 25px;
        border-radius: 15px;
        .target-image {
          width: 50px;
          height: 50px;
          background: #000;
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
          background: #000;
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
  }
}
</style>
