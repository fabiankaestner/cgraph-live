<template>
    <v-card class="d-flex flex-column flex-grow-1 overflow-hidden">
        <v-tabs
            v-model="tab"
            color="primary"
            dark
            slider-color="primary"
            fixed-tabs
        >
            <v-tab>Playbacks</v-tab>
            <v-tab>Data</v-tab>
            <v-tab>Rundowns</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item key="Graphics">
                <Playbacks />
            </v-tab-item>
            <v-tab-item key="Data">
                <Data />
            </v-tab-item>
            <v-tab-item key="Rundowns">
                <Rundowns />
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
import Playbacks from "./Playbacks";
import Data from "./Data";
import Rundowns from "./Rundowns";

export default {
    name: "Sidebar",
    components: {
        Playbacks,
        Data,
        Rundowns
    },
    data: () => ({
        tab: null
    })
};
</script>

<style scoped>
.v-window {
    flex-grow: 1;
}
.v-tabs {
    flex: 0 0 auto !important;
}
</style>
