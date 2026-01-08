import type {App, Plugin} from 'vue'
import Dialog from './src/Dialog.vue'

const VwpDialog = Dialog as unknown as Plugin & typeof Dialog

VwpDialog.install = (app: App) => {
  app.component(Dialog.name!, Dialog)
}

export default VwpDialog
