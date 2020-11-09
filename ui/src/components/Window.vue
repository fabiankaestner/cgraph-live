<template>
    <div class="window__container">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "Window"
};
</script>

<style>
.window__container {
    width: 100%;
    height: 100%;
}
</style>
