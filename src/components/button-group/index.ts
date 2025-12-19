import type { App } from 'vue'
import ButtonGroup from './src/ButtonGroup.vue'

ButtonGroup.install = (app: App) => {
  app.component(ButtonGroup.name!, ButtonGroup)
}

export default ButtonGroup
