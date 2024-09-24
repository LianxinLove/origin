import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import VXETable from "vxe-table";
import "vxe-table/lib/style.css";

// import turtleTable from 'turtle-table'
// import '../node_modules/turtle-table/style.css'

// import turtleTable from './components/index.js'

createApp(App).use(Antd).use(VXETable).mount("#app");
