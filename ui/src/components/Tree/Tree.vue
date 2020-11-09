<template>
    <div
        @dragover="dragOver"
        @dragleave.capture="handleDragEnd"
        class="container"
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
        elements: Object
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
        dragStart(e) {
            e.dataTransfer.dropEffect = "move";
        },
        dragOver(e) {
            e.dataTransfer.dropEffect = "move";
            e.preventDefault();
        },
        handleCursor(cursor) {
            this.cursor = cursor;
        },
        handleDragEnd() {
            console.log("end");
            this.cursor = { path: [], placement: "" };
        }
    }
};
</script>

<style scoped>
.container {
    flex: 1 1 auto;
}
</style>
