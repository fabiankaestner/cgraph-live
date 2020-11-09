<template>
    <div class="app__container">
        <div class="app__row">
            <div class="col"><Sidebar /></div>
            <div class="col"><Selected /></div>
            <div class="col"><Properties /></div>
            <div class="col"></div>
        </div>
        <div class="app__row app__status-bar">STATUS:OK</div>
    </div>
</template>

<style lang="scss">
html,
body {
    margin: 0;
    padding: 0;

    height: 100%;
    width: 100%;

    background-color: $bg-color;
    font-family: "Roboto";
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
    border: 1px solid;
    border-radius: 1px;
}
.app__status-bar {
    height: 25px;
    flex: 0 0 auto;
}
</style>

<script>
import Sidebar from "./components/Sidebar";
import Selected from "./components/Selected";
import Properties from "./components/Properties";

export default {
    name: "App",

    components: {
        Sidebar,
        Selected,
        Properties
    },

    data: () => ({})
};
</script>
