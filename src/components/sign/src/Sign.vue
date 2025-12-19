<template>
  <div class="vwp-sign">
    <canvas
        ref="canvasRef"
        :style="{ width: widthPx, height: heightPx }"
    />
    <div v-if="showButtons" class="vwp-sign__buttons">
      <VwpButton type="primary" @click="clear">清除</VwpButton>
      <VwpButton type="primary" @click="undo">撤回</VwpButton>
      <VwpButton type="primary" @click="save">保存</VwpButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, defineExpose } from 'vue'
import { isMobile } from '@vensst/js-toolkit'
import VwpButton from "../../button";
defineOptions({name: 'VwpSign'})
/* ---------------- props ---------------- */
interface SignOptions {
  strokeStyle?: string
  minWidth?: number
  maxWidth?: number
  backgroundColor?: string
}

const props = withDefaults(defineProps<{
  width?: number | string
  height?: number | string
  showButtons?: boolean
  options?: SignOptions
}>(), {
  width: 375,
  height: 200,
  showButtons: true,
  options: () => ({})
})

/* ---------------- canvas refs ---------------- */
const canvasRef = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null = null
let dpr = window.devicePixelRatio || 1

/* ---------------- state ---------------- */
type Point = { x: number; y: number; t: number }
type Stroke = { points: Point[] }

const history: Stroke[] = []
let currentStroke: Stroke | null = null
let drawing = false

/* ---------------- computed ---------------- */
const widthPx = computed(() =>
    typeof props.width === 'number' ? `${props.width}px` : props.width
)
const heightPx = computed(() =>
    typeof props.height === 'number' ? `${props.height}px` : props.height
)

const opt = computed(() => ({
  strokeStyle: '#000', // 画笔颜色
  minWidth: 1.5, // 画笔最小宽度
  maxWidth: 4, // 画笔最大宽度
  backgroundColor: '#fff', // 画布背景色
  ...props.options
}))

/* ---------------- init ---------------- */
onMounted(() => {
  const canvas = canvasRef.value!
  const rect = canvas.getBoundingClientRect()

  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr

  ctx = canvas.getContext('2d')!
  ctx.scale(dpr, dpr)

  resetCanvas()
  bindEvents(canvas)
})

/* ---------------- core methods ---------------- */
function resetCanvas() {
  if (!ctx || !canvasRef.value) return
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  ctx.fillStyle = opt.value.backgroundColor
  ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height)
}

function bindEvents(canvas: HTMLCanvasElement) {
  const start = isMobile() ? 'touchstart' : 'mousedown'
  const move = isMobile() ? 'touchmove' : 'mousemove'
  const end = isMobile() ? 'touchend' : 'mouseup'

  canvas.addEventListener(start, startDraw)
  canvas.addEventListener(move, draw)
  window.addEventListener(end, stopDraw)
}

function getPoint(e: any): Point {
  const ev = e.touches ? e.touches[0] : e
  const rect = canvasRef.value!.getBoundingClientRect()
  return {
    x: ev.clientX - rect.left,
    y: ev.clientY - rect.top,
    t: Date.now()
  }
}

/* ---------------- draw logic ---------------- */
function startDraw(e: Event) {
  e.preventDefault()
  drawing = true
  currentStroke = { points: [getPoint(e)] }
  history.push(currentStroke)
}

function draw(e: Event) {
  if (!drawing || !ctx || !currentStroke) return
  const points = currentStroke.points
  const p = getPoint(e)
  points.push(p)

  if (points.length < 2) return

  const p1 = points[points.length - 2]
  const p2 = p

  const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y)
  const time = p2.t - p1.t || 1
  const speed = dist / time

  const lineWidth = Math.max(
      opt.value.minWidth,
      Math.min(opt.value.maxWidth, opt.value.maxWidth / speed)
  )

  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.strokeStyle = opt.value.strokeStyle
  ctx.lineWidth = lineWidth
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.stroke()
}

function stopDraw() {
  drawing = false
  currentStroke = null
}

/* ---------------- actions ---------------- */
function undo() {
  if (!history.length) return
  history.pop()
  resetCanvas()
  redraw()
}

function clear() {
  history.length = 0
  resetCanvas()
}

function redraw() {
  if (!ctx) return
  history.forEach(stroke => {
    stroke.points.forEach((p, i) => {
      if (i === 0) return
      const p1 = stroke.points[i - 1]
      ctx!.beginPath()
      ctx!.moveTo(p1.x, p1.y)
      ctx!.lineTo(p.x, p.y)
      ctx!.stroke()
    })
  })
}

function save() {
  const url = canvasRef.value!.toDataURL('image/png')
  emit('save', url)
}

/* ---------------- expose ---------------- */
const emit = defineEmits<{
  (e: 'save', data: string): void
}>()

defineExpose({
  clear,
  undo,
  getDataURL: () => canvasRef.value?.toDataURL()
})
</script>

<style scoped>
.vwp-sign {
  display: inline-block;
  user-select: none;
}
canvas {
  border: 1px solid var(--vwp-border-color);
  touch-action: none;
}
.vwp-sign__buttons {
  margin-top: 12px;
  text-align: center;
}
.vwp-sign__buttons button {
  margin: 0 6px;
  padding: 6px 16px;
}
</style>
