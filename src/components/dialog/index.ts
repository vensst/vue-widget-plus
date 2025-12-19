import type { App } from 'vue'
import Dialog from './src/Dialog.vue'

Dialog.install = (app: App) => {
  app.component(Dialog.name!, Dialog)
}

export default Dialog
