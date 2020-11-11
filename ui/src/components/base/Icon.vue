<template>
    <Icon :icon="icons[i]" :height="height" />
</template>

<script>
import { Icon } from "@iconify/vue";
import close from "@iconify-icons/mdi/close";

export default {
    name: "cg-icon",
    props: {
        i: String,
        height: {
            type: String,
            required: false,
            default: "24"
        }
    },
    components: { Icon },
    data() {
        return {
            icons: {
                close
            }
        };
    }
};
</script>

<style>
.icon {
    font-family: "mdi-icons";
}
</style>
