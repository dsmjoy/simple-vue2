<template lang="html">
    <section id="hello" class="hello">

        <div class="hello__hd">
            <p class="hello__title">
                hello component
            </p>
        </div>

        <div class="hello__bd"></div>

        <div class="hello__ft"></div>

    </section>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
    .hello__ {

        &title {
            display: flex;
            color: #333;
        }
    }
</style>
