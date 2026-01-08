import type {App, Plugin} from "vue";
import Icon from "./src/Icon.vue";

const VwpIcon = Icon as unknown as Plugin & typeof Icon

VwpIcon.install = (app: App) => {
  app.component(Icon.name!, Icon);
};

export default VwpIcon;
