<template>
  <canvas
      ref="canvasRef"
      class="vwp-captcha-calc"
      :width="canvasWidth"
      :height="canvasHeight"
      @click="refresh"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { random, removeUnit } from '@vensst/js-toolkit'

defineOptions({ name: 'VwpCaptchaCalc' })
type Operators = '+' | '-' | '*' | '/'

export interface CaptchaCalcOptions {
  contentWidth?: number | string
  contentHeight?: number | string
  min?: number
  max?: number
  operators?: Array<Operators>
  backgroundColorMin?: number
  backgroundColorMax?: number
  colorMin?: number
  colorMax?: number
  lineNum?: number
  dotNum?: number
}

/* ---------------- props ---------------- */
const props = withDefaults(
    defineProps<{
      options?: CaptchaCalcOptions
    }>(),
    {
      options: () => ({})
    }
)

const emit = defineEmits<{
  (e: 'change', answer: number): void
}>()

/* ---------------- default options ---------------- */
const defaultOptions = {
  contentWidth: 88,
  contentHeight: 32,
  min: 1,
  max: 20,
  operators: ['+', '-', '*', '/'],
  backgroundColorMin: 180,
  backgroundColorMax: 240,
  colorMin: 40,
  colorMax: 160,
  lineNum: 4,
  dotNum: 20
}

/* ---------------- state ---------------- */
const canvasRef = ref<HTMLCanvasElement | undefined>()
let ctx: CanvasRenderingContext2D | null = null
const dpr: number = 1

const a = ref<number>(0)
const b = ref<number>(0)
const op = ref<Operators>('+')
const answer = ref<number>(0)

/* ---------------- computed ---------------- */
const cfg = computed(() => ({
  ...defaultOptions,
  ...props.options
}))

const width = computed<number>(() => {
  const w = cfg.value.contentWidth
  return typeof w === 'string' ? Number(removeUnit(w)) : w
})

const height = computed<number>(() => {
  const h = cfg.value.contentHeight
  return typeof h === 'string' ? Number(removeUnit(h)) : h
})

const canvasWidth = computed<number>(() => width.value * dpr)
const canvasHeight = computed<number>(() => height.value * dpr)

/* ---------------- utils ---------------- */
function randomColor(min: number, max: number): string {
  return `rgb(${random(min, max, false)},${random(min, max, false)},${random(
      min,
      max,
      false
  )})`
}

function calcResult(): number {
  switch (op.value) {
    case '+':
      return a.value + b.value
    case '-':
      return a.value - b.value
    case '*':
      return a.value * b.value
    case '/':
      return a.value / b.value
  }
}

/* ---------------- draw ---------------- */
function draw(): void {
  if (!ctx) return

  ctx.fillStyle = randomColor(
      cfg.value.backgroundColorMin,
      cfg.value.backgroundColorMax
  )
  ctx.fillRect(0, 0, width.value, height.value)

  ctx.save()
  ctx.font = 'bold 17px SimHei'
  ctx.fillStyle = randomColor(cfg.value.colorMin, cfg.value.colorMax)
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'

  ctx.translate(width.value / 2, height.value / 2)
  ctx.rotate((random(-10, 10, false)! * Math.PI) / 180)
  ctx.fillText(`${a.value} ${op.value} ${b.value} = ?`, 4, 0)
  ctx.restore()

  for (let i = 0; i < cfg.value.lineNum; i++) {
    ctx.strokeStyle = randomColor(40, 180)
    ctx.beginPath()
    ctx.moveTo(random(0, width.value, false)!, random(0, height.value, false)!)
    ctx.lineTo(random(0, width.value, false)!, random(0, height.value, false)!)
    ctx.stroke()
  }

  for (let i = 0; i < cfg.value.dotNum; i++) {
    ctx.fillStyle = randomColor(0, 255)
    ctx.beginPath()
    ctx.arc(
        random(0, width.value, false)!,
        random(0, height.value, false)!,
        1,
        0,
        Math.PI * 2
    )
    ctx.fill()
  }
}

/* ---------------- logic ---------------- */
function repeatGenerate(): { divisor: number; quotient: number } {
  const a = random(cfg.value.min, cfg.value.max, false)!
  const b = random(cfg.value.min, cfg.value.max, false)!
  if (a * b > cfg.value.max) {
    return repeatGenerate()
  }
  return {
    divisor: a * b,
    quotient: a
  }
}

function generate(): void {
  const operators = cfg.value.operators
  op.value = operators[random(0, cfg.value.operators.length, false)!] as Operators

  if (op.value === '/') {
    const { divisor, quotient } = repeatGenerate()
    a.value = divisor
    b.value = quotient
  } else if (op.value === '-') {
    if (a.value < b.value) {
      ;[a.value, b.value] = [b.value, a.value]
    }
  } else {
    a.value = random(cfg.value.min, cfg.value.max, false)!
    b.value = random(cfg.value.min, cfg.value.max, false)!
  }

  answer.value = calcResult()
  emit('change', answer.value)
  draw()
}

function refresh(): void {
  generate()
}

function validate(val: string | number): boolean {
  if (Number(val) === answer.value) {
    return true
  }
  refresh()
  return false
}

/* ---------------- lifecycle ---------------- */
onMounted(() => {
  const canvas = canvasRef.value!
  canvas.width = canvasWidth.value
  canvas.height = canvasHeight.value

  ctx = canvas.getContext('2d')!
  ctx.scale(dpr, dpr)
  ctx.textBaseline = 'middle'

  generate()
})

watch(() => props.options, refresh, { deep: true })

defineExpose({
  refresh,
  getCode: (): number => answer.value,
  validate
})
</script>

<style scoped>
.vwp-captcha-calc {
  cursor: pointer;
  user-select: none;
}
</style>
