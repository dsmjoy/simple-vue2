
import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'

Vue.config.devtools = true

import App from './app/app.vue'
import store from 'Store/index'
import router from 'Router/index'

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
