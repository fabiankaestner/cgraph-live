<template>
    <div>
        {{ completeState }}
    </div>
</template>

<script lang="ts">
export default {
    setup() {
        function completeState() {
            this.$store.state;
        }
        return { completeState };
    }
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
