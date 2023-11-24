import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
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

const pinia = createPinia()
//注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia).use(ElementPlus, {
    locale: zhCn,
})
app.use(router)
app.mount('#app')
