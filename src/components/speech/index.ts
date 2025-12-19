import type { App } from "vue";
import Speech from "./src/Speech.vue";

Speech.install = (app: App) => {
  app.component(Speech.name!, Speech);
};

export default Speech;
