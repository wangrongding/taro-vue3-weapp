<script setup lang="ts">
import { reactive, onMounted } from "vue";
import DPopup from "@/components/D-Popup.vue";
import Taro from "@tarojs/taro";
import { useAssetsStore } from "@/stores/assets";
import { getAmbientList } from "@/api/ambient";
import { useGlobalStore } from "@/stores/global";
import qs from "qs";
const globalStore = useGlobalStore();
const store = useAssetsStore();
const state = reactive({
  file: "ambient",
  ambientList: [] as any,
  jumpTo(item: any) {
    Taro.navigateTo({
      url: `/pages/play/index?${qs.stringify(item, { encode: false })}`,
    });
  },
  getAmbientList() {
    getAmbientList({}, { failToast: true, loading: true, mask: true }).then((res) => {
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
          @tap="state.jumpTo(item)"
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
        <image class="bear" :src="store.assets.bear.placeholder" alt="" />
        <text class="empty-text">完成冒险,可获得环境音~</text>
      </view>
    </template>
    <template #title>
      <image class="logo-image" :src="store.assets.home.popupSound.soundPopupSound" alt="" />
    </template>
  </D-Popup>
  <view class="play-action-bar" v-if="globalStore.ambient.playStatus">
    <image class="play-action-bar-image" :src="globalStore.ambient.musicImg" alt="" />
    <text class="play-action-bar-text">{{ globalStore.ambient.musicName }}</text>
    <!-- 控制播放、暂停 -->
    <view
      class="play"
      :style="{
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundImage: globalStore.ambient.playStatus
          ? `url(${store.assets.common.pause})`
          : `url(${store.assets.common.play})`,
        backgroundSize: '100% 100%',
      }"
    />
  </view>
</template>
<style lang="scss">
.play-action-bar {
  position: absolute;
  bottom: 100px;
  height: 58px;
  width: 100vw;
  box-sizing: border-box;
  padding: 0 10px;
  background-color: #00000059;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .play-action-bar-image {
    width: 34px;
    height: 34px;
    border: 4px solid #fff;
    border-radius: 50%;
  }
  .play-action-bar-text {
    flex-grow: 1; //这三个元素只有它在有空余空间时可伸缩，也就是它占据了所有剩余空间
    display: flex; //将它设置为flex,就可以单独对他进行主轴右对齐
    justify-content: flex-start;
    height: 30px;
    line-height: 30px;
    color: white;
    margin-left: 10px;
  }
  .play {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    line-height: 36px;
    background-size: 100% 100%;
    overflow: hidden;
  }
}
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
