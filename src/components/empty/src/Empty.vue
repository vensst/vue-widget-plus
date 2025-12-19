<!--
 * @Name: Empty.vue
 * @Description:
 * @Date: 2025-12-16 15:59:49
 * @Author: huyafei
 * @LastEditors: huyafei
 * @LastEditTime: 2025-12-16 15:59:49
-->
<template>
  <div class="vwp-empty">
    <div class="vwp-empty__icon" v-if="isIcon">
      <slot name="icon">
        <VwpIcon name="empty" :size="48" />
      </slot>
    </div>

    <div class="vwp-empty__description">
      <slot>{{ description }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import VwpIcon from '../../icon'

defineOptions({
  name: 'VwpEmpty'
})

defineProps({
  isIcon: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    default: '暂无数据'
  }
})
</script>

<style scoped lang="scss">
.vwp-empty {
  height: 100%;
  width: 100%;
  color: var(--vwp-text-color-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__icon {
    margin-bottom: 8px;
  }

  &__description {
    font-size: var(--vwp-font-size-base);
  }
}
</style>
