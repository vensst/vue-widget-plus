import type {App, Plugin} from "vue";
import Speech from "./src/Speech.vue";

const VwpSpeech = Speech as unknown as Plugin & typeof Speech

VwpSpeech.install = (app: App) => {
  app.component(Speech.name!, Speech);
};

export default VwpSpeech;
