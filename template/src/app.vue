
<template lang="html">
  <div class="app" @click="showTip">
      hello <span class="content">{{ name }}</span>
      <span class="app-new" style="color: green">yeah!</span>
      <hello></hello>
  </div>
</template>

<script>
import Hello from './components/hello.vue'
export default {
    data () {
        return {
            name: 'webpack2 and vue2'
        }
    },
    methods: {
        showTip () {
            alert('hi')
            Object.assign({a:1},{b:2})
        }
    },
    components: {Hello}
}
</script>

<style lang="scss">
.app {
    font-weight: bold;

    display: flex;
    align-items: center;
    justify-content: center;

    .content {
        font-size: 20px;
    }

    &-new {
        color: red;
    }
}
</style>
