import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/** home routes **/
import homeRoutes from './modules/home'
import Home from 'Views/Home/Home.vue'
/** home routes **/

/** user routes **/
import userRoutes from './modules/home'
import User from 'Views/User/User.vue'
/** user routes **/

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        name: 'home',
        component: Home,
        children: homeRoutes
    },
    {
        name: 'user',
        component: User,
        children: userRoutes
    }
]

const router = new Router({
    routes
})

export default router
