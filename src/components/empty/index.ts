import type {App, Plugin} from 'vue'
import Empty from './src/Empty.vue'

const VwpEmpty = Empty as unknown as Plugin & typeof Empty

VwpEmpty.install = (app: App) => {
  app.component(Empty.name!, Empty)
}

export default VwpEmpty
