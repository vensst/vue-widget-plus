import {createApp} from 'vue'
import App from './App.vue'
import * as echarts from 'echarts';

import "./style.css"
import VueWidgetPlus from "@vensst/vue-widget-plus";
import '@vensst/vue-widget-plus/dist/index.css'
// import {
//   VwpButton,
//   VwpButtonGroup,
//   VwpCaptcha,
//   VwpChart,
//   VwpContextMenu,
//   VwpDialog,
//   VwpEmpty,
//   VwpIcon,
//   VwpInput,
//   VwpLink,
//   VwpScrollTable,
//   VwpSign,
//   VwpSpeech
// } from "@vensst/vue-widget-plus";



const app = createApp(App)
app.use(VueWidgetPlus, {$echarts: echarts})
// app.use(VwpButton)
// app.use(VwpButtonGroup)
// app.use(VwpDialog)
// app.use(VwpInput)
// app.use(VwpIcon)
// app.use(VwpScrollTable)
// app.use(VwpSpeech)
// app.use(VwpLink)
// app.use(VwpEmpty)
// app.use(VwpChart,{$echarts: echarts})
// app.use(VwpSign)
// app.use(VwpContextMenu)
// app.use(VwpCaptcha)
app.mount('#app')
