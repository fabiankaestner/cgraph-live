<template>
    <cg-window>
        <cg-tab-bar :tabs="tabs" v-model="selectedTab" />
        <cg-tab-view v-model="selectedTab">
            <cg-rundowns />
        </cg-tab-view>
    </cg-window>
    <!-- <v-card class="d-flex flex-column flex-grow-1 overflow-hidden">
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
    </v-card> -->
</template>

<script>
import { ref } from "vue";

// import Playbacks from "./Playbacks";
// import Data from "./Data";
import cgRundowns from "./Rundowns";
import cgWindow from "./base/Window";
import cgTabBar from "./Tabs/TabBar";
import cgTabView from "./Tabs/TabView";

export default {
    name: "Sidebar",
    components: {
        cgWindow,
        cgTabBar,
        cgTabView,
        cgRundowns
    },
    setup() {
        const tabs = ["Rundown"];
        const selectedTab = ref(0);

        return {
            tabs,
            selectedTab
        };
    }
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
