<template>
    <cg-tab-bar
        :tabs="tabNames"
        v-model="selectedTab"
        close
        @close="deselect"
    />
    <cg-tab-view v-model="selectedTab">
        <component
            v-for="(tab, idx) in tabs"
            :key="idx"
            :is="tab.component"
            :address="tab.id"
        />
    </cg-tab-view>
    <!-- <v-card class="d-flex flex-column flex-grow-1 overflow-hidden">
        <v-tabs v-model="tab" color="primary" dark slider-color="primary">
            <v-tab v-for="t in tabs" :key="t.address">
                <v-icon @click="deselect(t.address)">mdi-close</v-icon>
                {{ t.props.name.value }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item v-for="t in tabs" :key="t.address">
                <component :is="t.component" :address="t.id"></component>
            </v-tab-item>
        </v-tabs-items>
    </v-card> -->
</template>

<script>
import { parseStringAddress } from "common/helpers/address";
import { getStrAddressFromState } from "common/helpers/getters";
import Rundown from "./Rundown";
import cgTabBar from "./Tabs/TabBar";
import cgTabView from "./Tabs/TabView";

export default {
    name: "Selected",
    components: {
        cgTabBar,
        cgTabView
    },

    computed: {
        tabs() {
            const tabs = [];
            for (let address of this.$store.state.local.selected) {
                const { type, id } = parseStringAddress(address);
                let component = undefined;
                if (type === "rundown") {
                    component = Rundown;
                }
                tabs.push({ component, id, address });
            }
            return tabs;
        },

        tabNames() {
            const tabNames = [];
            for (let address of this.$store.state.local.selected) {
                if (address) {
                    const tabObject = getStrAddressFromState(
                        this.$store.state,
                        address
                    );
                    if (tabObject) {
                        tabNames.push(tabObject.props.name.value);
                        continue;
                    }
                }
                tabNames.push("UNDEFINED");
            }
            return tabNames;
        },

        selectedTab: {
            get() {
                return this.$store.getters["local/currentlySelectedIdx"];
            },
            set(newValue) {
                this.$store.commit("local/select_tab", {
                    address: this.$store.state.local.selected[newValue]
                });
            }
        }
    },

    methods: {
        deselect(idx) {
            this.$store.commit("local/deselect", {
                address: this.tabs[idx].address
            });
        }
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
