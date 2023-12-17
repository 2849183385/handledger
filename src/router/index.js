import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/view/Login/index.vue'
import Layout from '@/view/Layout/index.vue'
import Home from '@/view/Home/index.vue'
import Help from '@/view/Help/index.vue'
// import Plan from '@/view/Plan/index.vue'
import User from '@/view/User/index.vue'
import Publish from '@/view/publish/index.vue'
// import Loader from '@/view/Loader/index.vue'
// import UserIndex from '@/view/User/views/UserIndex.vue'
// import UserCollection from '@/view/User/views/UserCollection.vue'
// import UserOpus from '@/view/User/views/UserOpus.vue'
// import UserSetting from '@/view/User/views/UserSetting.vue'
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
          path: 'favorites',
          name: 'userCollection',
          component: () => import('@/view/favorites/index.vue')
        },
        {
              path: 'notes',
              name: 'userOpus',
              component: () => import('@/view/notes/index.vue')
            },
        {
          path: `user`,
          name: 'user',
          component: User,
        },
        {
          path: 'publish',
          component: Publish
        },

        {
          path: 'plan',
          name: 'plan',
          component: () => import('@/view/Plan/index.vue')
        },
        {
          path: 'help',
          name: 'help',
          component: Help,
          children: [
          ]
        },
      ]
    },
    {
      path: '/login',
      component: Login,

    },
    {
      path: '/detail/:post_id',
      component: () => import('@/view/Detail/index.vue')
    }
  ],
  // 路由行为定制（路由切换后。页面自动跳到顶部）
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
