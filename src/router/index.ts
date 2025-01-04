import { createRouter, createWebHistory } from "vue-router";

import Framework from '../views/Framework.vue'
// import Aside from "../views/Aside.vue"
import Main from "../views/Main.vue"
import TopMain from "../views/TopMain.vue"
import Initializebbar from "../views/Initializebbar.vue"
import Baidu from '../views/Baidu.vue'
import DynamicPage from '../views/DynamicPage.vue'
import InitAuto from '../views/InitAuto.vue'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
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
                    path:"/InitAuto",
                    name:"初始化书签页(自动)",
                    component:InitAuto
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
        }
    ]
})

export default router