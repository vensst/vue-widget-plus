import type {App, Plugin} from 'vue'
import ContextMenu from './src/ContextMenu.vue'

const VwpContextMenu = ContextMenu as unknown as Plugin & typeof ContextMenu

VwpContextMenu.install = (app: App) => {
  app.component(ContextMenu.name!, ContextMenu)
}

export default VwpContextMenu
