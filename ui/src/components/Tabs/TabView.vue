<script>
export default {
    name: "cg-tab-view",
    props: {
        tabs: {
            type: Array,
            default: () => []
        },
        modelValue: Number
    },
    render() {
        if (!this.$slots.default || !(this.modelValue >= 0)) {
            return undefined;
        }
        const component = this.$slots.default()[this.modelValue];
        return (
            <div class="tabs__view">
                <component />
            </div>
        );
    }
};
</script>

<style>
.tabs__view {
    flex: 1 0 auto;
    flex-basis: 0;
    overflow: auto;
}
</style>
