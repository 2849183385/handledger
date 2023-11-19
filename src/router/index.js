import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/view/Login/index.vue'
import Layout from '@/view/Layout/index.vue'
import Home from '@/view/Home/index.vue'
import Help from '@/view/Help/index.vue'
import Plan from '@/view/Plan/index.vue'
import User from '@/view/User/index.vue'
import UserIndex from '@/view/User/views/UserIndex.vue'
import UserCollection from '@/view/User/views/UserCollection.vue'
import UserOpus from '@/view/User/views/UserOpus.vue'
import UserSetting from '@/view/User/views/UserSetting.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          //path：'',表示默认加载
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: `user`,
          name: 'user',
          component: User,
          
          children: [
            {
              path: '',
              name: 'userIndex',
              component: UserIndex
            },
            {
              path: 'collection',
              name: 'userCollection',
              component: UserCollection
            },
            {
              path: 'opus',
              name: 'userOpus',
              component: UserOpus
            },
            {
              path: 'setting',
              name: 'userSetting',
              component:  UserSetting
            }
          ]
        },
        {
          path: 'help',
          name: 'help',
          component: Help,
          children: [

          ]
        },
        {
          path: 'plan',
          name: 'plan',
          component: Plan,
        }
      ]
    },

    {
      path: '/login',
      component: Login
    },
  ],
  // 路由行为定制（路由切换后。页面自动跳到顶部）
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
