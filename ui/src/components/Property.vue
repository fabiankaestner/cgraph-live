<template>
    <component :is="component" :value="value" @input="i => $emit('input', i)" />
</template>

<script>
import cgStringProperty from "./StringProperty";

export default {
    name: "cg-property",
    props: ["value"],
    emits: ["input"],
    computed: {
        component() {
            if (this.value) {
                if (this.value.type === "string") {
                    return cgStringProperty;
                }
            }
            return undefined;
        }
    }
};
</script>

<style></style>
