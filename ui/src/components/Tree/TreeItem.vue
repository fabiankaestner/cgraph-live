<template>
    <div draggable="true" class="tree__container">
        <span>{{ item.title }}</span>
    </div>
</template>

<script>
export default {
    name: "cg-tree-item",
    props: ["item"]
};
</script>

<style lang="scss">
.tree__container {
    width: 100%;
    padding: 7px 13px;
    border-radius: 1px;
    &:hover {
        background-color: transparentize(
            $color: lighten($color: $color-primary, $amount: 0.3),
            $amount: 0.6
        );
        cursor: pointer;
        transition: 0.2s;
    }
}
</style>
