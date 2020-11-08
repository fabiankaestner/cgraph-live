<template>
    <v-app>
        <div class="row">
            <div class="col"><Sidebar /></div>
            <div class="col"><Selected /></div>
            <div class="col"><Properties /></div>
            <div class="col"><Tree /></div>
        </div>
    </v-app>
</template>

<style scoped>
.row {
    display: flex;
    flex-direction: row;
}
.col {
    flex: 1 1;
    border: 1px solid #58585831;
    border-radius: 1px;
}
</style>

<style>
body {
    margin: 0;
    padding: 0;
    background-color: #1817 !important;
}
</style>

<script>
import Sidebar from "./components/Sidebar";
import Selected from "./components/Selected";
import Properties from "./components/Properties";
import Tree from "./components/Tree/Tree";

export default {
    name: "App",

    components: {
        Sidebar,
        Selected,
        Properties,
        Tree,
    },

    data: () => ({}),
};
</script>
