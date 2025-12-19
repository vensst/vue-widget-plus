<template>
  <i
      class="vwp-icon"
      :style="iconStyle"
  >
    <component
        v-if="iconComponent"
        :is="iconComponent"
    />
    <slot v-else />
  </i>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { CSSProperties } from "vue";

defineOptions({
  name: "VwpIcon"
});

const props = defineProps<{
  size?: number | string
  color?: string
  name?: string
}>();

/**
 * 动态加载 svg icon（本地 svg）
 * 未来可扩展为 iconfont / cdn
 */
const iconModules = import.meta.glob("./icons/*.svg", {
  eager: true
}) as Record<string, { default: any }>;

const iconComponent = computed(() => {
  if (!props.name) return null;
  return iconModules[`./icons/${props.name}.svg`]?.default || null;
});

const iconStyle = computed<CSSProperties>(() => {
  const size = props.size
      ? typeof props.size === "number"
          ? `${props.size}px`
          : props.size
      : "1em";

  return {
    fontSize: size,
    color: props.color
  };
});
</script>

<style scoped>
.vwp-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.vwp-icon svg {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
