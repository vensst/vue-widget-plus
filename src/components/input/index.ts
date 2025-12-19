import type { App } from "vue";
import Input from "./src/Input.vue";

Input.install = (app: App) => {
  app.component(Input.name!, Input);
};

export default Input;
