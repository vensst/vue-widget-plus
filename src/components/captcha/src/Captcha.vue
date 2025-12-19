<template>
  <component
      :is="componentName"
      ref="innerRef"
      :options="options"
  />
</template>

<script setup lang="ts">
import { computed, ref, defineExpose } from 'vue'

import CaptchaOrdinary from './CaptchaOrdinary.vue'
import CaptchaSlide from './CaptchaSlide.vue'
import CaptchaCalc from './CaptchaCalc.vue'

defineOptions({ name: 'VwpCaptcha' })

/* ---------------- props ---------------- */
/**
 * ⚠️ 注意：
 * 这里 options 不能使用子组件的私有类型
 * 否则 d.ts 会编译失败
 */
const props = withDefaults(defineProps<{
  type?: 'ordinary' | 'slide' | 'calc'
  options?: Record<string, any>
}>(), {
  type: 'ordinary',
  options: () => ({})
})

/* ---------------- component map ---------------- */
const componentMap = {
  ordinary: CaptchaOrdinary,
  slide: CaptchaSlide,
  calc: CaptchaCalc
} as const

const componentName = computed(() => {
  return componentMap[props.type] || CaptchaOrdinary
})

/* ---------------- ref ---------------- */
const innerRef = ref<any>(null)

/* ---------------- expose (统一 API) ---------------- */
defineExpose({
  /** 校验（普通 / 计算 / 滑动） */
  validate(value?: any): boolean {
    return innerRef.value?.validate?.(value) ?? false
  },

  /** 刷新验证码 */
  refresh(): void {
    innerRef.value?.refresh?.()
  },

  /** 获取验证码值（普通 / 计算） */
  getCode(): any {
    return innerRef.value?.getCode?.()
  }
})
</script>
