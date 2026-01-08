import type {App, Plugin} from "vue";
import Link from "./src/Link.vue";

const VwpLink = Link as unknown as Plugin & typeof Link

VwpLink.install = (app: App) => {
  app.component(Link.name!, Link);
};

export default VwpLink;
