<template>
  <component :is="component" :value="value" @input="i => $emit('input', i)" />
</template>

<script>
import StringProperty from "./StringProperty"

export default {
    name: "Property",
    props: ["value"],
    computed: {
        component() {
            if (this.value) {
                if (this.value.type === "string") {
                    return StringProperty
                }
            }
            return undefined
        }
    }
}
</script>

<style>

</style>