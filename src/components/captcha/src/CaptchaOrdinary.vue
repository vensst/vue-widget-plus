<template>
  <canvas
      ref="canvasRef"
      class="vwp-captcha-ordinary"
      :width="canvasWidth"
      :height="canvasHeight"
      @click="refresh"
  />
</template>

<script setup lang="ts">
import {computed, defineExpose, onMounted, ref, watch} from 'vue'
import {random, removeUnit} from '@vensst/js-toolkit'

defineOptions({name: 'VwpCaptchaOrdinary'})

/* ---------------- types ---------------- */
type CaptchaMode =
    | 'alpha'
    | 'alpha-upper'
    | 'alpha-lower'
    | 'number'
    | 'mixed'

export interface CaptchaOrdinaryOptions {
  codeNum?: number
  mode?: CaptchaMode
  ignoreCase?: boolean
  contentWidth?: number | string
  contentHeight?: number | string
  fontSizeMin?: number
  fontSizeMax?: number
  colorMin?: number
  colorMax?: number
  backgroundColorMin?: number
  backgroundColorMax?: number
  dotNum?: number
  dotColorMin?: number
  dotColorMax?: number
  lineNum?: number
  lineColorMin?: number
  lineColorMax?: number
}

/* ---------------- constants ---------------- */
const defaultOptions = {
  mode: 'mixed',
  ignoreCase: false,
  codeNum: 4,
  contentWidth: 88,
  contentHeight: 32,
  fontSizeMin: 18,
  fontSizeMax: 40,
  colorMin: 50,
  colorMax: 160,
  backgroundColorMin: 180,
  backgroundColorMax: 240,
  dotNum: 30,
  dotColorMin: 0,
  dotColorMax: 255,
  lineNum: 6,
  lineColorMin: 40,
  lineColorMax: 180
}

/* ---------------- props / emits ---------------- */
const props = withDefaults(defineProps<{
  options?: CaptchaOrdinaryOptions
}>(), {
  options: () => ({})
})

const emit = defineEmits<{
  (e: 'change', code: string): void
}>()

/* ---------------- refs ---------------- */
const canvasRef = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)

const selectCode = ref<string>('')
const selectCodeArr = ref<string[]>([])

const dpr: number = 1

/* ---------------- computed ---------------- */
const newOptions = computed(() => ({
  ...defaultOptions,
  ...props.options
}))

const width = computed<number>(() => {
  const w = newOptions.value.contentWidth
  return typeof w === 'string' ? Number(removeUnit(w)) : w
})

const height = computed<number>(() => {
  const h = newOptions.value.contentHeight
  return typeof h === 'string' ? Number(removeUnit(h)) : h
})

const canvasWidth = computed<number>(() => width.value * dpr)
const canvasHeight = computed<number>(() => height.value * dpr)

/* ---------------- watch ---------------- */
watch(
    () => props.options,
    () => refresh(),
    {deep: true}
)

/* ---------------- lifecycle ---------------- */
onMounted(() => {
  initCanvas()
  refresh()
})

/* ---------------- methods ---------------- */
function initCanvas(): void {
  const canvas = canvasRef.value
  if (!canvas) return

  const context = canvas.getContext('2d')
  if (!context) return

  context.scale(dpr, dpr)
  context.textBaseline = 'bottom'
  ctx.value = context
}

/* ---------- public ---------- */
function refresh(): void {
  generateCode()
  draw()
}

function getCode(): string {
  return selectCode.value
}

/* ---------- draw ---------- */
function draw(): void {
  if (!ctx.value) return
  const context = ctx.value

  context.fillStyle = randomColor(
      newOptions.value.backgroundColorMin,
      newOptions.value.backgroundColorMax
  )
  context.fillRect(0, 0, width.value, height.value)

  selectCodeArr.value.forEach((char, i) => {
    drawText(context, char, i)
  })

  drawLine(context)
  drawDot(context)
}

function drawText(
    context: CanvasRenderingContext2D,
    txt: string,
    i: number
): void {
  const fontSize = randomNum(
      newOptions.value.fontSizeMin,
      newOptions.value.fontSizeMax
  )

  const x = (i + 1) * (width.value / (selectCodeArr.value.length + 1))
  const y = randomNum(fontSize, height.value - 5)
  const deg = (randomNum(-30, 30) * Math.PI) / 180

  context.save()
  context.font = `bold ${fontSize}px SimHei`
  context.fillStyle = randomColor(
      newOptions.value.colorMin,
      newOptions.value.colorMax
  )
  context.translate(x, y)
  context.rotate(deg)
  context.fillText(txt, 0, 0)
  context.restore()
}

function drawLine(context: CanvasRenderingContext2D): void {
  for (let i = 0; i < newOptions.value.lineNum; i++) {
    context.strokeStyle = randomColor(
        newOptions.value.lineColorMin,
        newOptions.value.lineColorMax
    )
    context.beginPath()
    context.moveTo(randomNum(0, width.value), randomNum(0, height.value))
    context.lineTo(randomNum(0, width.value), randomNum(0, height.value))
    context.stroke()
  }
}

function drawDot(context: CanvasRenderingContext2D): void {
  for (let i = 0; i < newOptions.value.dotNum; i++) {
    context.fillStyle = randomColor(
        newOptions.value.dotColorMin,
        newOptions.value.dotColorMax
    )
    context.beginPath()
    context.arc(
        randomNum(0, width.value),
        randomNum(0, height.value),
        1,
        0,
        Math.PI * 2
    )
    context.fill()
  }
}

/* ---------- data ---------- */
function getCharSource(): string {
  const lower = 'abcdefghijklmnopqrstuvwxyz'
  const upper = lower.toUpperCase()
  const number = '0123456789'

  switch (newOptions.value.mode) {
    case 'alpha':
      return lower + upper
    case 'alpha-upper':
      return upper
    case 'alpha-lower':
      return lower
    case 'number':
      return number
    default:
      return lower + upper + number
  }
}

function generateCode(): void {
  const source = getCharSource()
  const result: string[] = []

  for (let i = 0; i < newOptions.value.codeNum; i++) {
    const index = randomNum(0, source.length - 1)
    result.push(source[index] as string)
  }

  selectCodeArr.value = result
  selectCode.value = result.join('')
  emit('change', selectCode.value)
}

/* ---------- utils ---------- */
function randomNum(min: number, max: number): number {
  return random(min, max, false)!
}

function randomColor(min: number, max: number): string {
  return `rgb(${randomNum(min, max)},${randomNum(min, max)},${randomNum(min, max)})`
}

function validate(code: string): boolean {
  if (!code) return false

  const target = selectCode.value

  if (newOptions.value.ignoreCase) {
    return code.toLowerCase() === target.toLowerCase()
  }

  if (code === target) {
    return true
  } else {
    refresh()
    return false
  }
}

/* ---------------- expose ---------------- */
defineExpose({
  refresh,
  getCode,
  validate
})
</script>
<style scoped>
.vwp-captcha-ordinary {
  cursor: pointer;
  user-select: none;
}
</style>
