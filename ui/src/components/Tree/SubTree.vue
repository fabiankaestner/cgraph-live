<template>
    <div class="tree__container">
        <template v-for="(child, idx) in elements" :key="idx">
            <div :class="cursorClass(idx)"></div>
            <div v-if="child.children" class="tree__group">
                <div
                    class="tree__item__container"
                    @dragover.stop="handleDragOver($event, idx)"
                >
                    <cg-tree-item
                        :item="(({ children, ...rest }) => rest)(child)"
                        :data-index="idx"
                        @click="handleClick(idx)"
                        @dblclick="handleDblclick(idx)"
                    />
                </div>
                <cg-sub-tree
                    :elements="child.children"
                    :cursor="childCursor(idx)"
                    @cursor="handleCursor($event, idx)"
                    @click="handleClick(idx, $event)"
                    @dblclick="handleDblclick(idx, $event)"
                />
            </div>
            <div
                v-else
                class="tree__item__container"
                @dragover.stop="handleDragOver($event, idx)"
            >
                <cg-tree-item
                    :item="child"
                    @click="handleClick(idx)"
                    @dblclick="handleDblclick(idx)"
                />
            </div>
        </template>
        <div :class="cursorClass(elements.length)"></div>
    </div>
</template>

<script>
import cgTreeItem from "./TreeItem";

export default {
    name: "cg-sub-tree",

    props: {
        elements: { type: Array, default: () => [] },
        cursor: Object
    },

    emits: ["click", "dblclick", "cursor"],

    components: {
        cgTreeItem
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
            // Returns css classes for the provided index

            return `tree__separator ${
                this.isActiveCursor(idx) ? "tree__separator--active" : ""
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
            // Bubble cursor events up the tree

            this.$emit("cursor", { path: [idx, ..._path], placement });
        },

        getEventFor(idx, bubbledEvent) {
            // returns the click/dblclick event for a given idx

            const path = bubbledEvent ? [idx, ...bubbledEvent.path] : [idx];
            const data = bubbledEvent
                ? bubbledEvent.data
                : this.elements[idx].data;

            return {
                path,
                data
            };
        },

        handleClick(idx, bubbledEvent) {
            this.$emit("click", this.getEventFor(idx, bubbledEvent));
        },

        handleDblclick(idx, bubbledEvent) {
            this.$emit("dblclick", this.getEventFor(idx, bubbledEvent));
        },
        childCursor(idx) {
            if (
                (placement === "inside" && this.cursor.path.length === 1) ||
                idx !== this.pathIdx
            ) {
                // prevent cursor on child elements if inside this group
                // or child elements that are not in the path
                return { path: [], placement: "" };
            }
            const { path, placement } = this.cursor;
            const [, ...newPath] = path;
            return { path: newPath, placement };
        }
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
        }
    }
};
</script>

<style>
.tree__separator {
    height: 0px;
    position: relative;
}
.tree__separator::before {
    content: "";
    height: 4px;
    top: -2px;
    position: absolute;
    background-color: rgba(33, 45, 200, 0.5);
    width: 100%;
    opacity: 0;
}
.tree__item__container {
    padding: 3px;
}
.tree__separator--active::before {
    opacity: 1;
}
.tree__group > .tree__container {
    padding-left: 10px;
}
</style>
