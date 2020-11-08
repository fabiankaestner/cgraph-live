<template>
    <div
        @dragover="dragOver"
        @dragleave.capture="handleDragEnd"
        class="container"
    >
        <SubTree
            level="1"
            :elements="elements"
            :cursor="cursor"
            @cursor="handleCursor"
        />
    </div>
</template>

<script>
import SubTree from "./SubTree";

export default {
    props: ["container", "treeItem", "separator"],
    components: {
        SubTree,
    },
    data() {
        return {
            elements: [
                { name: "Element 1" },
                { name: "Element 2" },
                { name: "Element 3" },
                {
                    name: "Element 4",
                    children: [{ name: "Child 1" }, { name: "Child 2" }],
                },
                { name: "Element 5" },
                { name: "Element 6" },
                { name: "Element 7" },
            ],
            cursor: { path: [], position: "" },
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
        },
    },
};
</script>

<style scoped>
.container {
    flex: 1 1 auto;
}
</style>
