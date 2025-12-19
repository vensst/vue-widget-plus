import type { App } from 'vue'
import Captcha from './src/Captcha.vue'

Captcha.install = (app: App) => {
  app.component(Captcha.name!, Captcha)
}

export default Captcha
