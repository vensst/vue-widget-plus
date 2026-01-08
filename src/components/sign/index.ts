import type {App, Plugin} from "vue";
import Sign from "./src/Sign.vue";

const VwpSign = Sign as unknown as Plugin & typeof Sign


VwpSign.install = (app: App) => {
  app.component(Sign.name!, Sign);
};

export default VwpSign;
