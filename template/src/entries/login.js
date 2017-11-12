
import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'

Vue.use(Router)

Vue.config.devtools = true

import Login from './login/login.vue'
import store from 'Store/index'

const routes = [

]

const router = new Router({
    routes
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
