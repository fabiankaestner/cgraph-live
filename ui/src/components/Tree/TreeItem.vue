<template>
    <div
        draggable="true"
        :class="{ tree__item: true, 'tree__item--selected': item.selected }"
    >
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
$c: transparentize(lighten($color-primary, 0), 0.5);

.tree__item {
    padding: 8px 13px;
    border-radius: 3px;
    box-sizing: border-box;
    font-weight: 500;
    background-position: center;

    &:hover {
        background-color: $c;
        cursor: pointer;
        transition: 0.4s;
    }

    &:active {
        background-color: lighten($c, 10);
        background-size: 100%;
        transition: background 0s;
    }
}
.tree__item--selected {
    background-color: transparentize($c, 0.3);
}
</style>
