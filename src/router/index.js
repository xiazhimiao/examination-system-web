import { createRouter, createWebHistory } from 'vue-router'

//导入组件
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'
import List from '@/views/text/ListAll.vue'
import Paper from '@/views/text/Paper.vue'
import textPaper from '@/views/text/textPaper.vue'
import Grade from '@/views/text/Grade.vue'
//定义路由关系
const routes = [
    { path: '/login', component: LoginVue },
    {
        path: '/', component: LayoutVue,redirect:'/text/List', children: [
            { path: '/text/List', component: List },
            {path:'/text/Paper',component:Paper},
            {path:'/text/textPaper',component:textPaper},
            {path:'/text/Grade',component:Grade}
           
        ]
    }
]

//创建路由器
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

//导出路由
export default router
