<script setup lang="ts">
import { reactive } from "vue";
import DPopup from "@/components/D-Popup.vue";
import { useStore } from "@/stores/assets";
import { getIntimacy } from "@/api/home/index";
const store = useStore();
const state = reactive({
  file: "intimacy",
  assets: store.assets.intimacy,
  // 获取亲密度
  getIntimacy() {
    getIntimacy({}, { failToast: true, loading: true })
      .then((res) => {});
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
      height="70%"
      :visible="props.visible"
      padding="37px 20px 0"
      :background-color="'#60D394FF'"
      :opened-callback="state.getIntimacy"
      :hiden-close-icon="true"
    >
      <template #content>
        <view class="intimacy-content">
          <text style="color: white; font-size: 22px">LV4</text>
          <view class="" style="text-align: center; height: 200px">
            <image class="heart" :src="state.assets.heart" alt="" />
            <nut-progress
              stroke-color="#FFD97DFF"
              :percentage="20"
              stroke-width="25"
              size="large"
              :text-inside="true"
              style="margin-top: 40px"
            />
            <view style="color: white; margin-top: 20px">亲密值等级越高，小白回来得就越快哦！</view>
          </view>
          <view
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
