import type {App, Component, Plugin} from 'vue'
import {ECHARTS_KEY} from './utils/constants'
import './styles/index.scss'
// 组件全量导出（按需使用）
export {default as VwpButton} from './components/button'
export {default as VwpButtonGroup} from './components/button-group'
export {default as VwpDialog} from './components/dialog'
export {default as VwpInput} from './components/input'
export {default as VwpIcon} from "./components/icon"
export {default as VwpScrollTable} from "./components/scroll-table"
export {default as VwpSpeech} from "./components/speech"
export {default as VwpLink} from "./components/link"
export {default as VwpEmpty} from "./components/empty"
export {default as VwpChart} from "./components/chart"
export {default as VwpSign} from "./components/sign"
export {default as VwpContextMenu} from "./components/context-menu"
export {default as VwpCaptcha} from "./components/captcha"


const modules = import.meta.glob("./components/*/index.ts", {
  eager: true
}) as Record<string, { default: Component }>;


const components: Component[] = []

Object.values(modules).forEach(m => {
  if (m.default?.name) {
    components.push(m.default)
  }
})

export interface VueWidgetPlusOptions {
  $echarts?: any
}

export const VueWidgetPlus: Plugin = {
  install(app: App, options: VueWidgetPlusOptions = {}) {
    components.forEach(c => {
      app.component(c.name!, c)
    })

    if (options.$echarts) {
      app.provide(ECHARTS_KEY, options.$echarts)

      // 同时挂到 globalProperties，兼容 Options API
      app.config.globalProperties.$echarts = options.$echarts
    }
  }
}
export default VueWidgetPlus
