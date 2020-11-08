<template>
    <div draggable="true" :class="$style.container">
        <span>{{ item.name }}</span>
    </div>
</template>

<script>
export default {
    props: ["item"]
};
</script>

<style module>
.container {
    width: 100%;
    padding: 7px 13px;
    border-radius: 1px;
}
.container:hover {
    background-color: #c62f5220;
}
</style>
