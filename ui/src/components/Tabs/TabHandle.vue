<template>
    <li :class="{ tabs__handle: true, 'tabs__handle--active': active }">
        <span class="tabs__handle__title">{{ name }}</span>
        <cg-icon
            i="close"
            height="18"
            class="tabs__handle__close"
            v-if="close"
            @click.prevent="$emit('close')"
        />
    </li>
</template>

<script>
import cgIcon from "../base/Icon";

export default {
    name: "cg-tab-handle",
    props: {
        close: Boolean,
        name: String,
        active: Boolean
    },
    emits: ["close"],
    components: { cgIcon }
};
</script>

<style lang="scss">
.tabs__handle {
    margin: 0px;
    padding: 0px 10px;

    height: 100%;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
}

.tabs__handle__title {
    font-size: 0.9em;
    padding: 5px;
}

.tabs__handle__close {
    border-radius: 50%;
    padding: 1px;
    transition: 0.2s;
    &:hover {
        background-color: transparentize($color-fg, 0.8);
    }
}

.tabs__handle--active {
    color: $color-primary;
    border-top: 3px solid $color-primary;
    background-color: $color-bg;
}
</style>
