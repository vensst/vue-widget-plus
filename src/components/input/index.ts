import type {App, Plugin} from "vue";
import Input from "./src/Input.vue";

const VwpInput = Input as unknown as Plugin & typeof Input

VwpInput.install = (app: App) => {
  app.component(Input.name!, Input);
};

export default VwpInput;
