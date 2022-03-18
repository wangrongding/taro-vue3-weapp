<script setup lang="ts">
import { reactive, onMounted } from "vue";
import DPopup from "@/components/D-Popup.vue";
import Taro from "@tarojs/taro";
import { useStore } from "@/stores";
import { getAmbientList } from "@/api/ambient";
const store = useStore();
const state = reactive({
  file: "ambient",
  assets: store.assets.ambient,
  ambientList: [] as any,
  jumpTo() {
    Taro.navigateTo({
      url: "/pages/ambient/play",
    });
  },
  getAmbientList() {
    getAmbientList({})
      .then((res) => {
        state.ambientList = res;
      });
  },
});
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
});
</script>
<template>
  <D-Popup
    position="bottom"
    height="70%"
    :visible="props.visible"
    padding="37px 20px 0"
    :background-color="'#F0F7F4FF'"
    :suffix-color="'#60D394FF'"
    :opened-callback="state.getAmbientList"
  >
    <template #content>
      <view class="list">
        <view
          class="item"
          v-for="(item, index) in state.ambientList"
          :key="index"
          @tap="state.jumpTo"
        >
          <image class="item-image" :src="item.icon" alt="" />
          <view class="item-content">
            <text>{{ item.soundName }}</text>
            <text>{{ item.explain }}</text>
          </view>
          <!-- <view class="exp">
            <text>5</text>
            <image :src="state.assets.empty" alt="" />
          </view> -->
        </view>
      </view>
      <view class="empty">
        <image class="bear" :src="state.assets.empty" alt="" />
        <text class="empty-text">完成冒险,可获得环境音~</text>
      </view>
    </template>
    <template #title>
      <image class="logo-image" :src="state.assets.title" alt="" />
    </template>
  </D-Popup>

  <!-- <nut-popup
    position="bottom"
    :style="{ height: 'auto' }"
    :visible="props.visible"
    @click-overlay="state.closePop"
    @click-close-icon="state.closePop"
    @opend="state.getAmbientList"
  >
    <view class="list">
      <view
        class="item"
        v-for="(item, index) in state.ambientList"
        :key="index"
        @tap="state.jumpTo"
      >
        <image class="item-image" :src="state.assets.item" alt="" />
        <view class="item-content">
          <text>田野</text>
          <text>描述信息描述信息描述信息</text>
        </view>
        <view class="exp">
          <text>5</text>
          <image :src="state.assets.empty" alt="" />
        </view>
      </view>
    </view>
    <view class="empty">
      <image class="bear" :src="state.assets.empty" alt="" />
      <text class="empty-text">完成冒险,可获得环境音~</text>
    </view>
  </nut-popup> -->
</template>
<style lang="scss">
.logo-image {
  width: 229px;
  height: 80px;
}
.list {
  overflow-y: scroll;
  height: 100%;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    height: 80px;
    padding: 0 20px;
    margin-bottom: 20px;
    border-radius: 15px;
    .item-image {
      width: 50px;
      height: 50px;
    }
    .item-content {
      flex: 1;
      margin-left: 20px;
      // width: 200px;
      display: flex;
      flex-direction: column;
      & > text:last-child {
        color: rgb(94, 94, 94);
        font-size: 14px;
        line-height: 30px;
      }
    }
    .exp {
      width: 40px;
      text-align: right;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      text {
        font-size: 16px;
        font-weight: 500;
      }
      image {
        width: 20px;
        height: 20px;
      }
    }
  }
}
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  .bear {
    width: 140px;
    height: 160px;
    align-items: center;
  }
  .empty-text {
    margin-top: 10px;
    font-size: 14px;
    color: #999999ff;
  }
}
</style>
