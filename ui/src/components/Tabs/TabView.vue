<template>
    <component :is="tabs[modelValue]" />
</template>

<script>
export default {
    props: {
        tabs: {
            type: Array,
            default: () => []
        },
        modelValue: Number
    }
};
</script>

<style></style>
