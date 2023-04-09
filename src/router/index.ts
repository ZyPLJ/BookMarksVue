import { createRouter, createWebHistory } from "vue-router";
import {useRouter} from 'vue-router'

import Framework from "../views/Framework.vue"
// import Aside from "../views/Aside.vue"
import Main from "../views/Main.vue"
import TopMain from "../views/TopMain.vue"
import Initializebbar from "../views/Initializebbar.vue"
import Index from '../views/Index.vue'
import Baidu from '../views/Baidu.vue'
import DynamicPage from '../views/DynamicPage.vue'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/Bookmarks',
            component:Framework,
            children:[
                {
                    path:'',
                    name:"书签展示页",
                    component:Main
                },
                {
                    path:"/Initializebbar",
                    name:"初始化书签页",
                    component:Initializebbar
                },
                {
                    path:'/TopMain',
                    name:"书签置顶栏",
                    component:TopMain
                },
                {
                    path:'/Baidu',
                    name:"百度搜索",
                    component:Baidu
                },
                {
                    path: '/dynamic-page/:id',
                    name: 'DynamicPage',
                    component: DynamicPage
                  }
            ]
        },
        {
            path:"/",
            component:Index
        }
    ]
})

export default router