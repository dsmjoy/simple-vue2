
import Vue from 'vue'
import Vuex from 'vuex'

Vue.config.devtools = true

import App from '../app.vue'
import store from '../store/index'

new Vue({
    el: '#app',
    store,
    render: h => h(App)
})
