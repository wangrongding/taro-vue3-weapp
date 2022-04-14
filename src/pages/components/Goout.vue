<script setup lang="ts">
import { reactive, computed } from "vue";
import { useAssetsStore } from "@/stores/assets";
import bus from "@/utils/eventBus";
import Taro from "@tarojs/taro";
import DPopup from "@/components/D-Popup.vue";
const store = useAssetsStore();
const state = reactive({
  file: "intimacy",
  assets: store.assets,
  closePop() {
    Taro.requestSubscribeMessage({
      tmplIds: ["24VUt4TYR4VFzRYVukh7NUMoCCy9pXMV94EJLjj_Ur8"],
    }).finally(() => {
      bus.emit("closePop");
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
  <view class="intimacy-container">
    <D-Popup
      position="bottom"
      height="550px"
      :visible="props.visible"
      padding="37px 20px 0"
      :background-color="'#fff'"
      :hiden-close-icon="true"
    >
      <template #content>
        <view class="intimacy-content">
          <text style="color: black; font-size: 22px; font-weight: 500; margin-top: 50px">
            小白出去探险了!
          </text>
          <view class="" style="text-align: center; height: 200px">
            <image class="bear" :src="state.assets.bear.placeholder" alt="" />
            <view style="color: #333333ff; margin-top: 20px">小白回来后会和你分享路上的见闻!</view>
          </view>
          <view
            @click="state.closePop"
            style="
              border-radius: 15px;
              text-align: center;
              background-color: #60d394ff;
              color: white
              height: 50px;
              width: 100px;
              line-height: 50px;
            "
          >
            好的
          </view>
        </view>
      </template>
    </D-Popup>
  </view>
</template>
<style lang="scss">
.intimacy-container {
  .intimacy-content {
    height: 100%;
    box-sizing: border-box;
    padding: 0 0 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .bear {
      width: 140px;
      height: 160px;
    }
  }
}
</style>
