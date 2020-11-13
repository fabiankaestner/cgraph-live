<template>
    <div
        @dragend.capture="handleDragEnd"
        @dragleave="handleDragLeave"
        @dragstart="handleDragStart"
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
    emits: ["click", "dblclick", "drop"],
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
        handleDrop(event) {
            const data = JSON.parse(event.dataTransfer.getData("text/plain"));
            console.log(JSON.parse(JSON.stringify(data.nodes)));
            data.cursor = this.cursor;
            console.log(data.nodes);
            console.log("DATA PARSED", data);
            this.$emit("drop", data);
            this.handleDragEnd();
            event.preventDefault();
        },
        handleDragStart(event) {
            console.log("start");
            const data = JSON.stringify({
                source: this.address,
                nodes: this.$store.state.local.treeSelections[this.address]
            });
            console.log("DATA:", data);
            event.dataTransfer.setData("text/plain", data);
            console.log(event);
        },
        handleDragEnd() {
            this.cursor = { path: [], position: "" };
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
