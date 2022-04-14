<script setup lang="ts">
import { reactive, computed } from "vue";
import DPopup from "@/components/D-Popup.vue";
import { useAssetsStore } from "@/stores/assets";
import { getIntimacy } from "@/api/home/index";
import { Intimate } from "@/types/index";
import bus from "@/utils/eventBus";
const store = useAssetsStore();
const state = reactive({
  file: "intimacy",
  intimateInfo: {} as Intimate,
  assets: store.assets.common,
  // 获取亲密度
  getIntimacy() {
    getIntimacy({}, { failToast: true, loading: true }).then((res: Intimate) => {
      state.intimateInfo = res;
    });
  },
  closePop() {
    bus.emit("closePop");
  },
});
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const intimateInfo = computed(() => {
  return (
    (parseInt(state.intimateInfo.intimateValue) / parseInt(state.intimateInfo.maxIntimateValue)) *
    100
  );
});
</script>
<template>
  <view class="intimacy-container">
    <D-Popup
      position="bottom"
      height="70%"
      :visible="props.visible"
      padding="37px 20px 0"
      :background-color="'#60D394FF'"
      :opened-callback="state.getIntimacy"
      :hiden-close-icon="true"
    >
      <template #content>
        <view class="intimacy-content">
          <text style="color: white; font-size: 22px">{{ state.intimateInfo.levelName }}</text>
          <view class="" style="text-align: center; height: 200px">
            <image class="heart" :src="state.assets.heartSquare" alt="" />
            <nut-progress
              stroke-color="#FFD97DFF"
              :text-inside="true"
              text-background="#EE6055FF"
              stroke-width="25"
              size="large"
              style="margin-top: 40px"
              :percentage="intimateInfo || 0"
            />
            <view style="color: white; margin-top: 20px">亲密值等级越高，小白回来得就越快哦！</view>
          </view>
          <view
            @click="state.closePop"
            style="
              color: #60d394ff;
              width: 100px;
              height: 50px;
              border-radius: 15px;
              text-align: center;
              background-color: white;
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
    // background-color: red;
    height: 100%;
    box-sizing: border-box;
    padding: 0 0 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .heart {
      width: 80px;
      height: 80px;
    }
  }
}
</style>
