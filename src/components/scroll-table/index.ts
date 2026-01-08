import type {App, Plugin} from "vue";
import ScrollTable from "./src/ScrollTable.vue";

const VwpScrollTable = ScrollTable as unknown as Plugin & typeof ScrollTable

VwpScrollTable.install = (app: App) => {
  app.component(ScrollTable.name!, ScrollTable);
};

export default VwpScrollTable;
