import type {App} from 'vue'
import ContextMenu from './src/ContextMenu.vue'

ContextMenu.install = (app: App) => {
  app.component(ContextMenu.name!, ContextMenu)
}

export default ContextMenu
