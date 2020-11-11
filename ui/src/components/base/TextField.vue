<template>
    <div class="text-field">
        <label class="text-field__label">{{ label }}</label>
        <input class="text-field__input" type="text" v-model="model" />
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

<style lang="scss">
.text-field {
    margin: 10px 0px;
    border-left: 3px solid transparentize($color-fg, 0.7);
    padding-left: 8px;
    &:focus-within {
        border-left: 3px solid $color-primary;
    }
}
.text-field__label {
    display: block;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 0.75em;
    margin-bottom: 3px;
}
.text-field__input {
    display: block;
    background: transparentize($color-fg, 0.9);
    border: none;
    border-radius: 1px;
    padding: 8px;
    color: inherit;
    transition: 0.2s;
    outline: none;
    &:focus {
        background: transparentize($color-fg, 0.7);
        border: none;
    }
    &:hover {
        background: transparentize($color-fg, 0.8);
    }
}
</style>
