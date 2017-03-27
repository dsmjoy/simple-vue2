<template lang="html">
    <div id="page" class="page">
        <Hello></Hello>
        <Card></Card>
    </div>
</template>

<script>
import Hello from '../components/Hello/Hello.vue'
import Card from '../components/Card/Card.vue'

export default {
    components: {
        Hello,
        Card
    }
}
</script>

<style lang="scss">
</style>
