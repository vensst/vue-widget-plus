import type { App } from "vue";
import Sign from "./src/Sign.vue";

Sign.install = (app: App) => {
  app.component(Sign.name!, Sign);
};

export default Sign;
