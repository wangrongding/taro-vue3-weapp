<template>
  <D-Popup
    position="bottom"
    height="70%"
    :visible="props.visible"
    padding="37px 20px 0"
    :background-color="'#fff'"
    :suffix-color="'#fff'"
    :hiden-close-icon="true"
    :closeable="true"
  >
    <template #content>
      <view class="in-adventure">
        <view class="in-adventure-content">
          <view class="in-adventure-title">真棒！</view>
          <view class="in-adventure-text">小白获得了{{ props.honeyCount }}点能量</view>
          <view class="in-adventure-text">冒险加速了{{ Number(props.honeyCount) * 2 }}分钟</view>
          <image class="in-adventure-logo" :src="state.assets.clock" alt="" />
        </view>
        <view class="in-adventure-btn" @tap="state.finish">完成</view>
      </view>
    </template>
  </D-Popup>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import DPopup from "@/components/D-Popup.vue";
import { useAssetsStore } from "@/stores/assets";
const store = useAssetsStore();
const emit = defineEmits(["moreVisible"]);
const state = reactive({
  assets: store.assets.home,
  finish() {
    emit("moreVisible", "");
  },
});
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
  honeyCount: {
    type: String,
    default: "",
    required: true,
  },
});
</script>

<style lang="scss">
.in-adventure {
  height: 51vh;
  text-align: center;
  .in-adventure-content {
    position: relative;
    height: 100%;
    flex: 1;
    overflow: auto;
    .in-adventure-title {
      font-size: 22px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #333333;
      margin: 25px 0 10px 0;
    }
    .in-adventure-text {
      font-size: 17px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }
    .in-adventure-logo {
      width: 100px;
      height: 100px;
      margin: 50px auto 0 auto;
    }
  }
  .in-adventure-btn {
    width: 142px;
    height: 58px;
    background: #60d394;
    border-radius: 15px;
    font-size: 15px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #ffffff;
    line-height: 58px;
    text-align: center;
    margin: 0 auto 30px auto;
  }
}
</style>
