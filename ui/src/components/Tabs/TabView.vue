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
        return <component />;
    }
};
</script>

<style></style>
