<script setup lang="ts">
import { reactive } from "vue";
import DPopup from "@/components/D-Popup.vue";
import { useStore } from "@/stores";
const store = useStore();
const emit = defineEmits(["closePop"]);

const state = reactive({
  file: "ambient",
  assets: store.assets.target,
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
    padding="37px 20px"
    :background-color="'#F0F7F4FF'"
    :suffix-color="'#60D394FF'"
    @closePop="state.closePop"
  >
    <template #content> gagagagag </template>
    <template #title> <image class="logo-image" :src="state.assets.title" alt="" /> </template>
  </D-Popup>
</template>
<style lang="scss">
.logo-image {
  width: 229px;
  height: 80px;
}
</style>
