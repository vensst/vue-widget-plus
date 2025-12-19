<template>
  <div
      class="vwp-button-group"
      :class="{ 'is-vertical': vertical }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide } from "vue";

defineOptions({
  name: "VwpButtonGroup"
});

const props = withDefaults(
    defineProps<{
      size?: "small" | "default" | "large"
      type?: "default" | "primary" | "success" | "warning" | "danger" | "info"
      vertical?: boolean
    }>(),
    {
      size: "default",
      type: "default",
      vertical: false
    }
);

/* 向 Button 注入 */
provide("VWP_BUTTON_GROUP", props);
</script>

<style scoped lang="scss">
.vwp-button-group {
  display: inline-flex;

  &.is-vertical {
    flex-direction: column;
  }

  /* 去掉中间圆角 */
  :deep(.vwp-button) {
    border-radius: 0;
  }

  /* 第一个 */
  :deep(.vwp-button:first-child) {
    border-top-left-radius: var(--vwp-button-border-radius);
    border-bottom-left-radius: var(--vwp-button-border-radius);
  }

  &.is-vertical :deep(.vwp-button:first-child) {
    border-top-right-radius: var(--vwp-button-border-radius);
  }

  /* 最后一个 */
  :deep(.vwp-button:last-child) {
    border-top-right-radius: var(--vwp-button-border-radius);
    border-bottom-right-radius: var(--vwp-button-border-radius);
  }

  &.is-vertical :deep(.vwp-button:last-child) {
    border-bottom-left-radius: var(--vwp-button-border-radius);
  }

  /* 边框重叠 */
  :deep(.vwp-button:not(:first-child)) {
    margin-left: -1px;
  }

  &.is-vertical :deep(.vwp-button:not(:first-child)) {
    margin-left: 0;
    margin-top: -1px;
  }
}
</style>
