<template>
  <div
      ref="wrapRef"
      class="vwp-captcha-slide"
      :style="wrapStyle"
  >
    <div ref="bgRef" class="vwp-captcha-slide__bg"/>
    <div class="vwp-captcha-slide__text">{{ text }}</div>

    <div
        ref="btnRef"
        :class="[
        'vwp-captcha-slide__btn',
        { 'is-success': isOk }
      ]"
        :style="btnStyle"
    >
      <VwpIcon :name="isOk ? 'check-circle-fill' : 'double-arrow-right'"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, ref} from 'vue'
import {hasUnit, isMobile} from '@vensst/js-toolkit'
import VwpIcon from '../../icon'

defineOptions({name: 'VwpCaptchaSlide'})

/* ---------------- types ---------------- */
type SlideEvent = MouseEvent | TouchEvent
export interface CaptchaSlideOptions {
  contentWidth?: number | string
  contentHeight?: number | string
}

/* ---------------- props ---------------- */
const props = withDefaults(
    defineProps<{
      options?: CaptchaSlideOptions
    }>(),
    {
      options: () => ({})
    }
)

const emit = defineEmits<{
  (e: 'change', val: boolean): void
}>()

/* ---------------- state ---------------- */
const text = ref<string>('拖动滑块验证')
const isOk = ref<boolean>(false)

const wrapRef = ref<HTMLElement | undefined>()
const btnRef = ref<HTMLElement | undefined>()
const bgRef = ref<HTMLElement | undefined>()

let startX: number = 0
let startLeft: number = 0
let maxLeft: number = 0

/* ---------------- computed ---------------- */
const wrapStyle = computed<Record<string, string>>(() => {
  const w = props.options.contentWidth ?? 160
  const h = props.options.contentHeight ?? 32
  console.log(w, h)
  const width = typeof w === 'string' && hasUnit(w) ? w : `${w}px`
  const height = typeof h === 'string' && hasUnit(h) ? h : `${h}px`

  return {
    width,
    height,
    lineHeight: height
  }
})

const btnStyle = computed<Record<string, string>>(() => ({
  width: wrapStyle.value.height as string,
  height: wrapStyle.value.height as string,
}))

/* ---------------- core logic ---------------- */
function onStart(e: SlideEvent): void {
  if (isOk.value) return

  const point = 'touches' in e ? e.touches[0] : e
  if (!point) return;
  startX = point.clientX
  startLeft = btnRef.value!.offsetLeft

  document.addEventListener(moveEvent, onMove)
  document.addEventListener(endEvent, onEnd)
}

function onMove(e: SlideEvent): void {
  const point = 'touches' in e ? e.touches[0] : e
  if(!point) return;
  let left = startLeft + (point.clientX - startX)

  left = Math.max(0, Math.min(left, maxLeft))

  btnRef.value!.style.left = `${left}px`
  bgRef.value!.style.width = `${left}px`

  if (left >= maxLeft - 2) {
    success()
  }
}

function onEnd(): void {
  if (!isOk.value) reset()
  cleanup()
}

/* ---------------- helpers ---------------- */
function success(): void {
  isOk.value = true
  text.value = '验证通过'
  emit('change', true)
  cleanup()
}

function reset(): void {
  isOk.value = false
  text.value = '拖动滑块验证'
  btnRef.value!.style.left = '0px'
  bgRef.value!.style.width = '0px'
  emit('change', false)
}

function cleanup(): void {
  document.removeEventListener(moveEvent, onMove)
  document.removeEventListener(endEvent, onEnd)
}

/* ---------------- lifecycle ---------------- */
const startEvent: 'mousedown' | 'touchstart' = isMobile()
    ? 'touchstart'
    : 'mousedown'

const moveEvent: 'mousemove' | 'touchmove' = isMobile()
    ? 'touchmove'
    : 'mousemove'

const endEvent: 'mouseup' | 'touchend' = isMobile()
    ? 'touchend'
    : 'mouseup'

onMounted((): void => {
  const wrap = wrapRef.value!
  const btn = btnRef.value!

  maxLeft = wrap.clientWidth - btn.clientWidth
  btn.addEventListener(startEvent, onStart)
})

onBeforeUnmount((): void => {
  cleanup()
})

/* ---------------- expose ---------------- */
defineExpose({
  refresh: reset,
  validate: (): boolean => isOk.value
})
</script>

<style scoped lang="scss">
.vwp-captcha-slide {
  position: relative;
  background: #eee;
  user-select: none;
  overflow: hidden;
}

.vwp-captcha-slide__bg {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0;
  background: var(--vwp-primary);
}

.vwp-captcha-slide__text {
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 14px;
  z-index: 1;
}

.vwp-captcha-slide__btn {
  position: absolute;
  left: 0;
  top: 0;
  background: #fff;
  border: 1px solid var(--vwp-border-color);
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  &.is-success i {
    color: var(--vwp-primary);
  }
}
</style>
