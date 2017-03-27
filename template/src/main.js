
import Vue from 'vue'
import Vuex from 'vuex'

Vue.config.devtools = true

import App from './app.vue'
import store from './store/index'

new Vue({
    el: '#app',
    store,
    render: h => h(App)
    // components: {App}  // 只能独立构建的时候用
})
