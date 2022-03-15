<script setup lang="ts">
import { reactive } from "vue";
import DPopup from "@/components/D-Popup.vue";
import { useStore } from "@/stores";
const store = useStore();
const emit = defineEmits(["closePop"]);

const state = reactive({
  file: "ambient",
  assets: store.assets.ambient,
  closePop() {
    emit("closePop");
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
    @closePop="state.closePop"
  >
    <template #content>
      <view class="list">
        <view class="item" v-for="(item, index) in 15" :key="index">
          <image class="item-image" :src="state.assets.empty" alt="" />
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
      <!-- 空占位 -->
      <view class="empty">
        <image class="bear" :src="state.assets.empty" alt="" />
        <text class="empty-text">完成冒险,可获得环境音~</text>
      </view>
    </template>
    <template #title> <image class="logo-image" :src="state.assets.title" alt="" /> </template>
  </D-Popup>
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
      margin-left: 20px;
      width: 200px;
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
