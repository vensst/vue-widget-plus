<template>
  <button
      class="vwp-button"
      :class="buttonClass"
      :disabled="disabled || loading"
  >
    <!-- loading -->
    <VwpIcon
        v-if="loading"
        class="vwp-button__icon is-loading"
        name="loading"
    />

    <!-- icon -->
    <VwpIcon
        v-else-if="icon"
        class="vwp-button__icon"
        :name="icon"
    />

    <span v-if="$slots.default" class="vwp-button__text">
      <slot/>
    </span>
  </button>
</template>

<script setup lang="ts">
import {computed, inject} from "vue";
import VwpIcon from "../../icon";

defineOptions({
  name: "VwpButton"
});

type ButtonType =
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "info";

type ButtonSize = "small" | "default" | "large";

const props = withDefaults(
    defineProps<{
      type?: ButtonType
      size?: ButtonSize
      plain?: boolean
      round?: boolean
      circle?: boolean
      disabled?: boolean
      icon?: string
      loading?: boolean
    }>(),
    {
      type: "default",
      size: "default",
      plain: false,
      round: false,
      circle: false,
      disabled: false,
      loading: false
    }
);

/* ===== ButtonGroup 注入 ===== */
const group = inject<any>("VWP_BUTTON_GROUP", null);

const mergeProps = (propValue: string, groupValue: string | undefined): string => {
  const normalizedProp = propValue && propValue !== 'default' ? propValue : '';

  if (group && groupValue && groupValue !== 'default') {
    return normalizedProp || groupValue;
  }

  return normalizedProp;
};

const mergedSize = computed<ButtonSize>(() => {
  return mergeProps(props.size, group?.size) as ButtonSize;
});

const mergedType = computed<ButtonType>(() => {
  return mergeProps(props.type, group?.type) as ButtonType;
});



const buttonClass = computed(() => [
  mergedType.value && mergedType.value !== 'default' ? `vwp-button--${mergedType.value}` : '',
  mergedSize.value && mergedSize.value !== 'default' ? `vwp-button--${mergedSize.value}` : '',
  {
    "is-plain": props.plain,
    "is-round": props.round,
    "is-circle": props.circle,
    "is-disabled": props.disabled,
    "is-loading": props.loading
  }
]);
</script>

<style scoped lang="scss">
/* ================= base ================= */
.vwp-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  height: var(--vwp-button-height-default);
  padding: 0 var(--vwp-button-padding-default);

  font-size: var(--vwp-button-font-size);
  border-radius: var(--vwp-button-border-radius);

  border: 1px solid var(--vwp-border-color);
  background-color: #fff;
  color: var(--vwp-text-color);

  cursor: pointer;
  user-select: none;

  transition: background-color 0.2s,
  border-color 0.2s,
  color 0.2s,
  filter 0.2s;

  &:not(.is-disabled):not(.is-loading):hover {
    filter: brightness(1.10);
  }

  &:not(.is-disabled):not(.is-loading):active {
    filter: brightness(0.95);
  }

  &.is-disabled,
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    filter: none;
  }
}

/* ================= size ================= */
.vwp-button--small {
  height: var(--vwp-button-height-small);
  padding: 0 var(--vwp-button-padding-small);
  font-size: var(--vwp-button-font-small);
}

.vwp-button--large {
  height: var(--vwp-button-height-large);
  padding: 0 var(--vwp-button-padding-large);
  font-size: var(--vwp-button-font-large);
}

/* ================= type variables ================= */
@mixin button-type($color) {
  --vwp-button-bg: #{$color};
  --vwp-button-border: #{$color};
  --vwp-button-text: #fff;
}

.vwp-button {
  @include button-type(var(--vwp-text-color));
}

.vwp-button--primary {
  @include button-type(var(--vwp-primary));
}

.vwp-button--success {
  @include button-type(var(--vwp-success));
}

.vwp-button--warning {
  @include button-type(var(--vwp-warning));
}

.vwp-button--danger {
  @include button-type(var(--vwp-danger));
}

.vwp-button--info {
  @include button-type(var(--vwp-info));
}

/* apply type */
/* ================= type ================= */
.vwp-button {
  background-color: #fff;
  border-color: var(--vwp-border-color);
  color: var(--vwp-text-color);
}

.vwp-button--primary,
.vwp-button--success,
.vwp-button--warning,
.vwp-button--danger,
.vwp-button--info {
  background-color: var(--vwp-button-bg);
  border-color: var(--vwp-button-border);
  color: var(--vwp-button-text);
}

/* ================= plain ================= */
.vwp-button.is-plain {
  background-color: transparent;
  color: var(--vwp-button-border);

  &:hover {
    background-color: color-mix(in srgb, var(--vwp-button-border) 10%, transparent);
    background-color: var(--vwp-button-bg);
    color: #fff;
  }
}

/* ================= round / circle ================= */
.vwp-button.is-round {
  border-radius: 999px;
}

.vwp-button.is-circle {
  border-radius: 50%;
  padding: 0;
  width: var(--vwp-button-height-default);

  &.vwp-button--small {
    width: var(--vwp-button-height-small);
  }

  &.vwp-button--large {
    width: var(--vwp-button-height-large);
  }
}

/* ================= icon ================= */
.vwp-button__icon {
  display: inline-flex;

  &.is-loading {
    animation: vwp-rotate 1s linear infinite;
  }
}

.vwp-button__text {
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
}

@keyframes vwp-rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
