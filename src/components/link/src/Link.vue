<!--
 * @Name: Link.vue
 * @Description:
 * @Date: 2025-12-16 10:17:47
 * @Author: huyafei
 * @LastEditors: huyafei
 * @LastEditTime: 2025-12-16 10:17:47
-->
<template>
  <a
      v-if="href"
      :href="disabled ? undefined : href"
      :target="target"
      :class="linkClass"
      @click="handleClick"
  >
    <VwpIcon
        v-if="icon"
        class="vwp-link__icon"
        :name="icon"
        :size="14"
    />
    <span class="vwp-link__text">
      <slot />
    </span>
  </a>

  <span
      v-else
      :class="linkClass"
      @click="handleClick"
  >
    <VwpIcon
        v-if="icon"
        class="vwp-link__icon"
        :name="icon"
        :size="14"
    />
    <span class="vwp-link__text">
      <slot />
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import VwpIcon from "../../icon";

defineOptions({
  name: "VwpLink"
});

type LinkType =
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "info";

const props = withDefaults(
    defineProps<{
      type?: LinkType;
      underline?: boolean;
      disabled?: boolean;
      href?: string;
      target?: "_self" | "_blank";
      icon?: string;
    }>(),
    {
      type: "default",
      underline: true,
      disabled: false,
      target: "_self"
    }
);

const linkClass = computed(() => [
  "vwp-link",
  `vwp-link--${props.type}`,
  {
    "is-disabled": props.disabled,
    "is-underline": props.underline
  }
]);

function handleClick(e: MouseEvent) {
  if (props.disabled) {
    e.preventDefault();
    e.stopPropagation();
  }
}
</script>
<style scoped lang="scss">
.vwp-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;

  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s;

  color: var(--vwp-text-color);

  &.is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.is-underline:not(.is-disabled):hover {
    text-decoration: underline;
  }
}

/* ============ type ============ */
.vwp-link--default {
  color: var(--vwp-text-color);
}

.vwp-link--primary {
  color: var(--vwp-primary);
}

.vwp-link--success {
  color: var(--vwp-success);
}

.vwp-link--warning {
  color: var(--vwp-warning);
}

.vwp-link--danger {
  color: var(--vwp-danger);
}

.vwp-link--info {
  color: var(--vwp-info);
}

/* hover */
.vwp-link:not(.is-disabled):hover {
  filter: brightness(1.1);
}

.vwp-link__icon {
  display: inline-flex;
}

.vwp-link__text {
  line-height: 1;
}
</style>
