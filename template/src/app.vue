
<template lang="html">

    <component
        :is="currentView"
    >

    </component>
</template>

<script>
import Page from './views/Page.vue'

export default {
    data () {
        return {
            currentView: 'page'
        }
    },
    components: {
        Page
    }
}
</script>

<style lang="scss">
</style>
