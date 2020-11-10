<template>
    <li>
        <span v-if="close" @click.prevent="$emit('close')">X</span>
        <span :class="{ 'tabs__handle--active': active }">{{ name }}</span>
    </li>
</template>

<script>
export default {
    name: "cg-tab-handle",
    props: {
        close: Boolean,
        name: String,
        active: Boolean
    },
    emits: ["close"],
    components: {}
};
</script>

<style>
.tabs__handle--active {
    color: red;
}
</style>
