<template>
    <div>
        <label>{{ label }}</label>
        <input
            type="text"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.value)"
        />
    </div>
</template>

<script>
export default {
    props: {
        modelValue: String,
        label: String
    },
    emits: ["update:modelValue"]
};
</script>

<style></style>
