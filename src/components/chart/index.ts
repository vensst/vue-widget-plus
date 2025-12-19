import type {App} from 'vue'
import Chart from './src/Chart.vue'
import {ECHARTS_KEY} from "../../utils/constants";

export interface VueWidgetPlusOptions {
  $echarts?: any
}

Chart.install = (app: App, options: VueWidgetPlusOptions = {}) => {
  app.component(Chart.name!, Chart)

  if (options.$echarts) {
    app.provide(ECHARTS_KEY, options.$echarts)

    // 同时挂到 globalProperties，兼容 Options API
    app.config.globalProperties.$echarts = options.$echarts
  }
}

export default Chart
