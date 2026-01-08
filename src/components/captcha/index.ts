import type { App,Plugin } from 'vue'
import Captcha from './src/Captcha.vue'

const VwpCaptcha = Captcha as unknown as Plugin & typeof Captcha

VwpCaptcha.install = (app: App) => {
  app.component(Captcha.name!, Captcha)
}

export default VwpCaptcha
