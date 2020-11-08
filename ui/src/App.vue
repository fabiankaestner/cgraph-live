<template>
    <div class="app__container">
        <!--         <div class="row">
            <div class="col"><Sidebar /></div>
            <div class="col"><Selected /></div>
            <div class="col"><Properties /></div>
            <div class="col"><Tree /></div>
        </div>
        <div class="row status">STATUS:OK</div>
 -->
    </div>
</template>

<style lang="scss">
.app__container {
    display: flex;
    flex-direction: column;
}
.app__row {
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
}
.app__ {
    flex: 1 1;
    border: 1px solid;
    border-radius: 1px;
}
.app__status-bar {
    height: 10px;
    flex: 0 0 auto;
}
</style>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    background-color: $bg-color;
    font-family: "Segoe UI" !important;
}
</style>

<script>
/* import Sidebar from "./components/Sidebar";
import Selected from "./components/Selected";
import Properties from "./components/Properties";
import Tree from "./components/Tree/Tree";
 */
export default {
    name: "App",

    components: {
        /*         Sidebar,
        Selected,
        Properties,
        Tree,
 */
    },

    data: () => ({})
};
</script>
