
import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'

Vue.config.devtools = true

import App from '../app.vue'
import store from '../store/index'
import router from '../route/index'

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
