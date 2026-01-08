import type {App, Plugin} from 'vue'
import ButtonGroup from './src/ButtonGroup.vue'

const VwpButtonGroup = ButtonGroup as unknown as Plugin & typeof ButtonGroup

VwpButtonGroup.install = (app: App) => {
  app.component(ButtonGroup.name!, ButtonGroup)
}

export default VwpButtonGroup
