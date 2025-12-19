<script setup lang="ts">
import type {PropType} from 'vue'
import {computed, getCurrentInstance, inject, nextTick, onBeforeUnmount, onMounted, ref, watch} from 'vue'
import VwpEmpty from '../../empty'
import {ECHARTS_KEY} from '../../../utils/constants'
import {useResizeObserver} from './useResizeObserver'

defineOptions({name: 'VwpChart'})

interface IEmptyOptions {
  isIcon?: boolean
  description?: string
}

const props = defineProps({
  options: {
    type: Object as PropType<any>,
    default: () => ({})
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "320px",
  },
  emptyOptions: {
    type: Object as PropType<IEmptyOptions>,
    default: () => ({})
  },
})

const rootRef = ref<HTMLElement>()
const chartRef = ref<HTMLElement>()
let chart: any = null

/** 1️⃣ 尝试多通道获取 echarts */
function resolveEcharts() {
  // 1️⃣ 插件注入
  const injected = inject(ECHARTS_KEY, null)
  if (injected) return injected

  // 2️⃣ 全局
  const inst = getCurrentInstance()
  const gp = inst?.appContext.config.globalProperties
  if (gp?.$echarts) return gp.$echarts

  // 3️⃣ Vue2 兼容
  // @ts-ignore
  if (inst?.proxy?.$echarts) return inst.proxy.$echarts

  console.warn('[VwpChart] echarts 未注入')
  return null
}

const echarts = resolveEcharts()

const showEmpty = computed(() => {
  const s = props.options?.series
  return !s || (Array.isArray(s) && s.length === 0)
})

function resizeChart() {
  if (chart) {
    chart.resize()
  }
}

const {observe, disconnect} = useResizeObserver(
    () => rootRef.value,
    resizeChart
)
const initChart = () => {
  if (!chartRef.value || !echarts) return
  chart = echarts.init(chartRef.value)
  chart.setOption(props.options)
  observe()
}

function disposeChart() {
  if (chart) {
    disconnect()
    chart.dispose()
    chart = null
  }
}


onMounted(async () => {
  await nextTick()
  if (showEmpty.value) return
  initChart()
})

watch(
    () => props.options,
    async () => {
      await nextTick()

      // ① 无数据 → 销毁 chart
      if (showEmpty.value) {
        disposeChart()
        return
      }

      // ② 有数据但 chart 不存在 → init
      if (!chart && chartRef.value && echarts) {
        initChart()
        return
      }

      // ③ 正常更新
      chart?.setOption(props.options, true)
    },
    {deep: true}
)

onBeforeUnmount(() => {
  disposeChart()
})
</script>

<template>
  <div ref="rootRef" class="vwp-chart" :style="{ width, height }">
    <div v-if="showEmpty" class="vwp-chart__empty">
      <VwpEmpty :is-icon="emptyOptions.isIcon" :description="emptyOptions.description">
        <slot></slot>
      </VwpEmpty>
    </div>
    <div v-else ref="chartRef" class="vwp-chart__canvas"/>
  </div>
</template>
<style scoped lang="scss">
.vwp-chart__canvas, .vwp-chart__empty {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
