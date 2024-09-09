import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import checkVersionPlugin from "./plugins/checkVersionPlugin";

const app = createApp(App);
app.use(checkVersionPlugin);

app.mount("#app");
