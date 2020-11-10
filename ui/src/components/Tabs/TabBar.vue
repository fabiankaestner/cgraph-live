<template>
    <ul class="tabs__bar">
        <cg-tab-handle
            v-for="(tab, idx) in tabs"
            :key="idx"
            :name="tab"
            :active="modelValue === idx"
            :close="close"
            @close="$emit('close', idx)"
            @click="$emit('update:modelValue', idx)"
        />
    </ul>
</template>

<script>
import cgTabHandle from "./TabHandle";

export default {
    props: {
        tabs: Array,
        modelValue: Number,
        close: Boolean
    },
    emits: ["update:modelValue", "close"],
    components: {
        cgTabHandle
    }
};
</script>

<style lang="scss">
.tabs__bar {
    margin: 0px;
    padding: 0px;

    height: 35px;
    background-color: $color-bg-dark;
}
</style>
