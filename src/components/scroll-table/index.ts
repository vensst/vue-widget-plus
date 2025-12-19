import type { App } from "vue";
import ScrollTable from "./src/ScrollTable.vue";

ScrollTable.install = (app: App) => {
  app.component(ScrollTable.name!, ScrollTable);
};

export default ScrollTable;
