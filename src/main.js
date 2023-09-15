import { createApp } from "vue";
import App from "./App.vue";
import router from "../router";
import { createHead } from "@vueuse/head";
import "../style.css";
const app = createApp(App);
app.use(createHead());
app.use(router);
app.mount("#app");
