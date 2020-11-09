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
    props: ["elements"],
    components: {
        SubTree
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
