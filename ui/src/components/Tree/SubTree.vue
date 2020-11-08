<template>
    <div class="tree">
        <template v-for="(child, idx) in elements">
            <div :class="cursorClass(idx)" :key="'sep' + idx"></div>
            <div
                v-if="child.children"
                class="group"
                :key="'group' + idx"
                @dragover.stop="handleDragOver($event, idx)"
            >
                <TreeItem
                    :item="(({ children, ...rest }) => rest)(child)"
                    :data-index="idx"
                />
                <SubTree
                    :level="level + 1"
                    :elements="child.children"
                    :cursor="childCursor"
                    @cursor="handleCursor($event, idx)"
                />
            </div>
            <div
                v-else
                class="item"
                :key="'item' + idx"
                @dragover.stop="handleDragOver($event, idx)"
            >
                <TreeItem :item="child" />
            </div>
        </template>
        <div :class="cursorClass(elements.length)"></div>
    </div>
</template>

<script>
import TreeItem from "./TreeItem";

export default {
    name: "SubTree",
    components: {
        TreeItem,
    },
    methods: {
        isActiveCursor(idx) {
            if (!this.cursorActive) {
                return false;
            }

            if (
                (this.pathIdx === idx && this.placement === "before") ||
                (this.pathIdx === idx - 1 && this.placement === "after")
            ) {
                return true;
            }

            if (idx === 0 && this.placement === "inside") {
                return true;
            }
        },
        cursorClass(idx) {
            return `separator ${
                this.isActiveCursor(idx) ? "separator__active" : ""
            }`;
        },
        handleDragOver(e, idx) {
            // get the hovered element & its dimensions
            const targetEl = e.target;
            const bounds = targetEl.getBoundingClientRect();
            const offset = bounds.top;
            const height = bounds.bottom - offset;

            // calculate the cursor position
            if (e.clientY < offset + height / 2) {
                // top half of the element
                this.$emit("cursor", { path: [idx], placement: "before" });
            } else if (idx && this.elements[idx].children) {
                // It's a group, place inside not after
                this.$emit("cursor", { path: [idx], placement: "inside" });
            } else {
                // bottom half of the element and not a group
                this.$emit("cursor", { path: [idx], placement: "after" });
            }
        },
        handleCursor({ path: _path, placement }, idx) {
            console.log("hC", _path, [idx, ..._path], idx, placement);
            this.$emit("cursor", { path: [idx, ..._path], placement });
        },
    },
    computed: {
        pathIdx() {
            return this.cursor.path[0];
        },
        placement() {
            return this.cursor.placement;
        },
        cursorActive() {
            // Check if this element is the correct level, or a child/parent element

            return (
                (this.cursor.path.length === 1 &&
                    this.placement !== "inside") ||
                (this.cursor.path.length === 0 && this.placement === "inside")
            );
        },
        childCursor() {
            if (placement === "inside" && this.cursor.path.length === 1) {
                // prevent inside placement from affecting all child elements
                return { path: [], placement: "" };
            }
            const { path, placement } = this.cursor;
            const [, ...newPath] = path;
            return { path: newPath, placement };
        },
    },
    props: ["root", "elements", "cursor", "level"],
};
</script>

<style>
.separator {
    height: 0px;
    position: relative;
}
.separator::before {
    content: "";
    height: 4px;
    top: -2px;
    position: absolute;
    background-color: rgba(33, 45, 200, 0.5);
    width: 100%;
    opacity: 0;
}
.separator__active::before {
    opacity: 1;
}
.tree {
    padding-left: 10px;
}
</style>
