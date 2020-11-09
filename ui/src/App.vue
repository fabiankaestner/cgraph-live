<template>
    <div>
        {{ completeState }}
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const Component = defineComponent({
    name: "App",
    setup() {
        function completeState(): any {
            return this.$store.state.local;
        }
        return { completeState };
    }
});

export default Component;
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
