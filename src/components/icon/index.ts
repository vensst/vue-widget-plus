import type { App } from "vue";
import Icon from "./src/Icon.vue";

Icon.install = (app: App) => {
  app.component(Icon.name!, Icon);
};

export default Icon;
