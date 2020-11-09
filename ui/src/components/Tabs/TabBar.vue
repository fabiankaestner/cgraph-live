<template>
    <ul>
        <li
            v-for="(tab, idx) in tabs"
            :key="idx"
            @click="$emit('update:modelValue', idx)"
            :class="{ 'tabs__item--active': modelValue === idx }"
        >
            {{ tab }}
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        tabs: Array,
        modelValue: Number
    },
    emits: ["update:modelValue"]
};
</script>

<style>
.tabs__item--active {
    color: red;
}
</style>
