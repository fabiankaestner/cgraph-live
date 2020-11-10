<template>
    <div class="status-bar">
        <span class="status-bar__status">Connected</span>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.status-bar {
    background-color: $color-bg-dark;
    border-top: $border-width solid $color-border;

    height: 25px;
    flex: 0 0 auto;

    display: flex;
    align-items: center;

    font-size: 0.75em;
}

.status-bar__status {
    color: $color-ok;
    padding: 0px 10px;
}
</style>
