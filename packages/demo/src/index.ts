/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2022/07/14 21:34:02 (GMT+0900)
 */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './components/App.vue'
import './style.scss'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
