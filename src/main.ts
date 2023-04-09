import { createApp } from 'vue'
import App from './App.vue'

//引入element plus框架
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 暗黑模式css
import 'element-plus/theme-chalk/dark/css-vars.css'

//图标库
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faGear,faBookmark,faArrowUp19,faFileLines,faImages,faMagnifyingGlass,faPlus,faStar,faTag,faThumbsUp,faDatabase,faServer } from '@fortawesome/free-solid-svg-icons'
//路由
import router from './router/index'

library.add(faGear,faBookmark,faArrowUp19,faFileLines,faImages,faMagnifyingGlass,faPlus,faStar,faTag,faThumbsUp,faDatabase,faServer)
createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.use(ElementPlus)
.mount('#app')
// const app = createApp(App)
// app.use(router)
// app.use(ElementPlus)
// app.component('font-awesome-icon', FontAwesomeIcon)
// app.mount("#app")
