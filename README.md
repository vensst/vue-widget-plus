# Vue Widget Plus

一个基于 **Vue 3 + TypeScript** 的轻量级组件库，提供常用 UI 组件与业务组件封装，支持 **按需引入 / 全量注册 / 插件化配置**
，并内置对 **ECharts** 的统一注入方案。

---

## ✨ 特性

- 🚀 基于 Vue 3 + Vite 构建
- 💡 完整 TypeScript 类型声明
- 📦 支持按需引入 & 全量注册
- 🔌 插件化安装（`app.use`）
- 🧩 面向业务的组件设计（ScrollTable / Captcha / Chart 等）

---

## 📦 安装

```bash
npm install @vensst/vue-widget-plus
# 或
pnpm add @vensst/vue-widget-plus
# 或
yarn add @vensst/vue-widget-plus
```

## ⚙️ 快速开始

### 全量引入

```js
import {createApp} from 'vue'
import App from './App.vue'
import * as echarts from 'echarts'

import VueWidgetPlus from '@vensst/vue-widget-plus'
import '@vensst/vue-widget-plus/dist/index.css'

const app = createApp(App)

app.use(VueWidgetPlus, {
  $echarts: echarts
})

app.mount('#app')
```

### 按需引入

```js

import {createApp} from 'vue'
import App from './App.vue'
import * as echarts from 'echarts'

import {VwpScrollTable,} from '@vensst/vue-widget-plus'
import '@vensst/vue-widget-plus/dist/index.css'

const app = createApp(App)
app.use(VwpScrollTable)
app.mount('#app')

```
