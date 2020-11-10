<template>
    <li :class="{ tabs__handle: true, 'tabs__handle--active': active }">
        <span v-if="close" @click.prevent="$emit('close')">X</span>
        <span class="tabs__handle__title">{{ name }}</span>
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

<style lang="scss">
.tabs__handle {
    margin: 0px;
    padding: 0px 10px;

    height: 100%;
    display: inline-flex;
    align-items: center;
}

.tabs__handle--active {
    color: $color-primary;
    border-top: $border-width solid $color-primary;
    background-color: $color-bg;
}
</style>
