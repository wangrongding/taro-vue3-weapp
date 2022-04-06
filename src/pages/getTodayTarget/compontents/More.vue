<template>
  <!-- 更多 -->
  <D-Popup
    position="bottom"
    height="20%"
    :visible="props.visible"
    padding="37px 20px 0"
    :background-color="'#fff'"
    :suffix-color="'#fff'"
    :hiden-close-icon="true"
  >
    <template #content>
      <view class="tips">睡前读一些放松的东西</view>
      <view class="jump" @tap="state.jump">跳过</view>
    </template>
  </D-Popup>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import DPopup from "@/components/D-Popup.vue";
import { skipTarget } from "@/api/target/index";
const emit = defineEmits(["moreVisible"]);
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
    required: true,
  },
  userTargetId: {
    type: String,
    default: "",
    required: true,
  },
});
const state = reactive({
  jump() {
    let params = {
      userTargetId: props.userTargetId,
    };
    skipTarget(params).then(() => {
      emit("moreVisible", "");
    });
  },
});
</script>

<style lang="scss">
.tips {
  height: 50px;
  background: #f7f8fa;
  line-height: 50px;
}
.jump {
  height: 50px;
  line-height: 50px;
  margin-top: 5px;
}
</style>
