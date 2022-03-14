<script setup lang="ts">
import { reactive } from "vue";
import { useStore } from "@/stores";
const store = useStore();
const emit = defineEmits(["closePop", "delete"]);
const state = reactive({
  file: "popup",
  assets: store.assets.target,
  closePop() {
    // emit("closePop");
    emit("closePop", {});
  },
});
const props = defineProps({
  position: {
    type: String,
    default: "bottom",
    required: true,
  },
  height: {
    type: String,
    default: "auto",
    required: true,
  },
  padding: {
    type: String,
    default: "30px 0px 20px",
  },
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
  suffixColor: {
    type: String,
    default: "",
  },
  backgroundColor: {
    type: String,
    default: "#F0F7F4FF",
  },
  closeable: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <nut-popup
    :position="props.position"
    :closeable="props.closeable"
    close-icon-position="top-left"
    close-icon="close-little"
    pop-class="pop"
    round
    :style="{ height: props.height, display: 'none' }"
    close-on-click-overlay
    :visible="props.visible"
    :z-index="100"
    @click-overlay="state.closePop"
    @click-close-icon="state.closePop"
  >
    <view
      class="popup-container"
      :style="{
        padding: props.padding,
        height: '100%',
        background: props.backgroundColor,
        boxSizing: 'border-box ',
      }"
    >
      <slot name="content" />
      <image
        @tap="state.closePop"
        class="close"
        :src="state.assets.close"
        alt=""
      />
    </view>
    <view class="title">
      <slot name="title" />
    </view>
    <view
      class="background-suffix"
      v-if="props.suffixColor"
      :style="{ backgroundColor: props.suffixColor }"
    />
    <!-- <view class="title"> title</view> -->
    <!-- <slot name="title" class="title" /> -->
  </nut-popup>
</template>
<style lang="scss">
.nut-popup {
  overflow: unset !important;
}
.pop {
  // position: relative;
  .popup-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    height: 100%;
    width: 100%;
    z-index: 1;
    border-radius: 19px 19px 0 0;
  }
  .title {
    z-index: 99;
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translate(-50%, -55px);
  }
  .background-suffix {
    z-index: 0;
    position: absolute;
    top: -5px;
    left: 0;
    right: 0;
    width: 100%;
    height: 30px;
    border-radius: 30px 30px 0 0;
  }
  .close {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    right: 20px;
    transform: translateY(-50%);
  }
}
</style>
