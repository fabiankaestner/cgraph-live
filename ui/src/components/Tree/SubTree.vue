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
                        @click="handleClick(idx, $event)"
                        @dblclick="handleDblclick(idx, $event)"
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
                    @click="handleClick(idx, $event)"
                    @dblclick="handleDblclick(idx, $event)"
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
                (this.pathIdx === idx && this.position === "before") ||
                (this.pathIdx === idx - 1 && this.position === "after")
            ) {
                return true;
            }

            if (idx === 0 && this.position === "inside") {
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

            e.dataTransfer.dropEffect = "move";
            e.preventDefault();

            // calculate the cursor position
            if (e.clientY < offset + height / 2) {
                // top half of the element
                this.$emit("cursor", { path: [idx], position: "before" });
            } else if (idx && this.elements[idx].children) {
                // It's a group, place inside not after
                this.$emit("cursor", { path: [idx], position: "inside" });
            } else {
                // bottom half of the element and not a group
                this.$emit("cursor", { path: [idx], position: "after" });
            }
        },

        handleCursor({ path: _path, position }, idx) {
            // Bubble cursor events up the tree

            this.$emit("cursor", { path: [idx, ..._path], position });
        },

        getEventFor(idx, bubbledEvent) {
            // returns the click/dblclick event for a given idx

            const path = bubbledEvent.isCustom
                ? [idx, ...bubbledEvent.path]
                : [idx];
            const data = bubbledEvent.isCustom
                ? bubbledEvent.data
                : this.elements[idx].data;
            const keys = bubbledEvent.isCustom
                ? bubbledEvent.keys
                : {
                      ctrl: bubbledEvent.getModifierState("Control")
                  };
            return {
                isCustom: true,
                path,
                data,
                keys
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
                (position === "inside" && this.cursor.path.length === 1) ||
                idx !== this.pathIdx
            ) {
                // prevent cursor on child elements if inside this group
                // or child elements that are not in the path
                return { path: [], position: "" };
            }
            const { path, position } = this.cursor;
            const [, ...newPath] = path;
            return { path: newPath, position };
        }
    },
    computed: {
        pathIdx() {
            return this.cursor.path[0];
        },

        position() {
            return this.cursor.position;
        },

        cursorActive() {
            // Check if this element is the correct level, or a child/parent element

            return (
                (this.cursor.path.length === 1 && this.position !== "inside") ||
                (this.cursor.path.length === 0 && this.position === "inside")
            );
        }
    }
};
</script>

<style lang="scss">
.tree__container {
    position: relative;
}
.tree__separator {
    height: 0px;
    position: relative;
    z-index: 10;
}
.tree__separator::before {
    content: "";
    height: 4px;
    top: -2px;
    position: absolute;
    background-color: transparentize($color-primary, 0.5);
    width: 100%;
    opacity: 0;
}
.tree__item__container {
    padding: 3px;
    position: relative;
    z-index: 20;
}
.tree__separator--active::before {
    opacity: 1;
}
.tree__group > .tree__container {
    padding-left: 10px;
}
</style>
