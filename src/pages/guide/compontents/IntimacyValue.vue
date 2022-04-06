<template>
  <view>
    <image class="logo-image" :src="props.assets.bear.happy" alt="" />
    <view class="logo-name"> “哦~ {{ props.userName }}，你好呀~” </view>
    <view class="intimate-data">
      <image class="intimate-icon" :src="props.assets.common.heartShaped" alt="" />
      <view class="intimate-name"> +3 亲密值</view>
    </view>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  userName: {
    type: String,
    default() {
      return "";
    },
    required: true,
  },
  assets: {
    type: Object,
    default() {
      return {};
    },
    required: true,
  },
});
</script>

<style lang="scss">
.intimate-data {
  width: 335px;
  height: 58px;
  background: #ff9b85;
  border-radius: 15px;
  margin-left: 20px;
  text-align: left;
  line-height: 58px;
  .intimate-icon {
    width: 31px;
    height: 28px;
    margin: 0 20px;
  }
  .intimate-name {
    vertical-align: super;
    display: inline-block;
    font-size: 17px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
