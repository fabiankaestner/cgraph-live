<template>
    <cg-window>
        <h2>{{ name }}</h2>
        <h6></h6>
        <cg-property
            v-for="name in props"
            :key="name"
            :value="evalProp(name)"
            @input="handleUpdate"
        ></cg-property>
    </cg-window>
    <!-- <v-card class="d-flex flex-column flex-grow-1 overflow-hidden">
        <v-card-title class="headline">{{ name }}</v-card-title>
        <v-card-subtitle>{{ address }}</v-card-subtitle>
        <v-divider></v-divider>
        <v-container>
            <v-list>
                <Property
                    v-for="name in props"
                    :key="name"
                    :value="evalProp(name)"
                    @input="handleUpdate"
                />
            </v-list>
            <v-btn
                v-if="updated"
                color="primary"
                class="float-right"
                text
                @click="commit"
            >
                <v-icon> mdi-check </v-icon>
                Commit Changes
            </v-btn>
        </v-container>
    </v-card> -->
</template>

<script>
import { parseStringAddress } from "common/helpers/address";

import cgWindow from "./base/Window";
import cgProperty from "./Property.vue";

export default {
    name: "Properties",
    components: { cgProperty, cgWindow },
    data() {
        return { updated: false, updatedProps: {} };
    },
    methods: {
        handleUpdate({ own, name, type, value, autoUpdate, link }) {
            this.updatedProps[name] = {
                type,
                value,
                autoUpdate,
                link,
                own
            };
            this.updated = true;
        },
        evalProp(name) {
            if (this.updatedProps[name] === undefined) {
                this.updatedProps[name] = false;
            }
            return this.$store.getters[`${this.type}/evaluate`](this.id, name);
        },
        commit() {
            // loop through all updatedProps
            for (let name in this.updatedProps) {
                // check if really updated, or just default value false
                if (this.updatedProps[name]) {
                    // update the property in the vuex store
                    this.$store.commit(`${this.type}/update_property`, {
                        name,
                        id: this.id,
                        update: this.updatedProps[name]
                    });
                    // clear the update value
                    this.updatedProps[name] = false;
                }
            }
            this.updated = false;
        }
    },
    computed: {
        address() {
            return this.$store.state.local.properties || "";
        },
        type() {
            return (parseStringAddress(this.address) || {}).type;
        },
        id() {
            return (parseStringAddress(this.address) || {}).id;
        },
        props() {
            return this.type && this.id
                ? this.$store.getters[`${this.type}/getPropertyNames`](this.id)
                : [];
        },
        name() {
            return this.type && this.id
                ? this.$store.getters[`${this.type}/evaluate`](this.id, "name")
                      .value
                : "";
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
.v-icon {
    margin-right: 10px;
}
</style>
