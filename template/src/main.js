
import Vue from 'vue'
import Vuex from 'vuex'

import App from './app.vue'

new Vue({
    el: '#app',
    render: h => h(App)
    // components: {App}  // 只能独立构建的时候用
})
