<template>
    <div class="app__container">
        <div class="app__row">
            <div class="app__col"><Sidebar /></div>
            <div class="app__col"><Selected /></div>
            <div class="app__col"><Properties /></div>
            <div class="app__col"></div>
        </div>
        <cg-status-bar />
    </div>
</template>

<style lang="scss">
* {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    padding: 0;

    height: 100%;
    width: 100%;

    background-color: $color-bg;
    color: $color-fg;
    font-family: "Roboto";
    font-size: 0.95em;
}

#app {
    height: 100%;
    width: 100%;
}

.app__container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}
.app__row {
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
}
.app__col {
    border-left: $border-width solid $color-border;
    border-radius: 1px;
    flex: 1 0 auto;
    flex-basis: 0;
}
</style>

<script>
import Sidebar from "./components/Sidebar";
import Selected from "./components/Selected";
import Properties from "./components/Properties";
import cgStatusBar from "./components/StatusBar";

export default {
    name: "App",

    components: {
        Sidebar,
        Selected,
        Properties,
        cgStatusBar
    },

    data: () => ({})
};
</script>
