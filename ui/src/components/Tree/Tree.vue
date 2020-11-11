<template>
    <div
        @dragend.capture="handleDragEnd"
        @dragleave="handleDragLeave"
        @drop.capture="handleDrop"
        class="tree__scroll-container"
    >
        <cg-sub-tree
            level="1"
            :elements="elements"
            :cursor="cursor"
            @cursor="handleCursor"
            @click="$emit('click', $event)"
            @dblclick="$emit('dblclick', $event)"
        />
    </div>
</template>

<script>
import cgSubTree from "./SubTree";

export default {
    name: "cg-tree",
    props: {
        elements: Object,
        address: String
    },
    emits: ["click", "dblclick"],
    components: {
        cgSubTree
    },
    data() {
        return {
            cursor: { path: [], position: "" }
        };
    },
    methods: {
        handleCursor(cursor) {
            this.cursor = cursor;
        },
        handleDrop() {
            console.log("Drop ", this.cursor);
        },
        handleDragEnd() {
            this.cursor = { path: [], placement: "" };
        },
        handleDragLeave(e) {
            const parent = this.$el.parentElement;
            const bounds = parent.getBoundingClientRect();
            if (
                e.clientX <= bounds.x ||
                e.clientX >= bounds.x + parent.clientWidth ||
                e.clientY <= bounds.y ||
                e.clientY >= bounds.y + parent.clientHeight
            ) {
                // the event is at the bounding box of the parent container
                this.handleDragEnd();
            }
        }
    }
};
</script>

<style>
.tree__scroll-container {
    width: 100%;
    height: 100%;
}
</style>
