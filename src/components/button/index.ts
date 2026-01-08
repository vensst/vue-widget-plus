import type {App, Plugin} from 'vue'
import Button from './src/Button.vue'

const VwpButton = Button as unknown as Plugin & typeof Button

VwpButton.install = (app: App) => {
  app.component(Button.name!, Button)
}

export default VwpButton
