<template>
    <span class="icon">
        <Icon :icon="icons[i]" :height="height" />
    </span>
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
    display: inline-flex;
    align-items: center;
}
</style>
