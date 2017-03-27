
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// modules
import sub from './modules/sub'

const store = new Vuex.Store({
    state: {

    },
    modules: {
        sub
    },
    strict: process.env.NODE_ENV !== 'production'
})

export default store
