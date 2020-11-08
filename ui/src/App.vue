<template>
    <div class="app">
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

<style scoped>
.app {
    display: flex;
    flex-direction: column;
}
.row {
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
}
.status {
    height: 10px;
    flex: 0 0 auto;
}
.col {
    flex: 1 1;
    border: 1px solid rgb(10, 10, 10);
    border-radius: 1px;
}
</style>

<style>
body {
    margin: 0;
    padding: 0;
    background-color: rgb(37, 37, 37) !important;
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

    data: () => ({}),
};
</script>
