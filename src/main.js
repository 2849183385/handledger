import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/styles/common.scss'
import '@/assets/fonts/iconfont.css'
import router from './router'

// 导入 element-plus
import ElementPlus from "element-plus";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 导入 element-plus 图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// ElementPlus.Dialog.props.lockScroll.default = false;
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}



app.use(createPinia()).use(ElementPlus, {
    locale: zhCn,
})
app.use(router)
app.mount('#app')
