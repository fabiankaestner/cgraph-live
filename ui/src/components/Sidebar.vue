<template>
    <cg-window>
        <cg-tab-bar :tabs="tabs" v-model="selectedTab" />
        <cg-tab-view v-model="selectedTab">
            <cg-rundowns />
            <cg-playbacks />
            <cg-data />
        </cg-tab-view>
    </cg-window>
</template>

<script>
import { ref } from "vue";

import cgPlaybacks from "./Playbacks";
import cgData from "./Data";
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
        cgRundowns,
        cgPlaybacks,
        cgData
    },
    setup() {
        const tabs = ["Rundowns", "Playbacks", "Data"];
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
