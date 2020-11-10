<template>
    <div>
        <label>{{ label }}</label>
        <input type="text" v-model="model" />
    </div>
</template>

<script>
export default {
    props: {
        modelValue: String,
        label: String
    },
    emits: ["update:modelValue"],
    computed: {
        model: {
            get() {
                return this.modelValue;
            },
            set(newValue) {
                this.$emit("update:modelValue", newValue);
            }
        }
    }
};
</script>

<style></style>
