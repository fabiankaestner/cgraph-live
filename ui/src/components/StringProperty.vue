<template>
    <li class="property__container">
        <cg-text-field
            v-model="v"
            :label="`${value.name} <${value.type}>`"
        ></cg-text-field>
        <span>{{ value.inherited }}</span>
    </li>
    <!-- <v-list-item>
        <v-list-item-content>
            <v-flex>
                <v-text-field
                    :label="value.name"
                    v-model="v"
                    dense
                    outlined
                    placeholder=" "
                    :messages="value.inherited ? 'Inherited' : undefined"
                >
                </v-text-field>
            </v-flex>
            <v-flex shrink>
                <v-btn
                    text
                    icon
                    :color="value.link ? 'primary' : 'secondary'"
                    @click="link"
                >
                    <v-icon>mdi-link</v-icon>
                </v-btn>
                <v-btn
                    text
                    icon
                    :color="value.autoUpdate ? 'primary' : 'secondary'"
                    @click="autoUpdate"
                >
                    <v-icon>mdi-update</v-icon>
                </v-btn>
                <v-btn text icon color="secondary" @click="clear">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-flex>
        </v-list-item-content>
    </v-list-item> -->
</template>

<style></style>

<script>
import cgTextField from "./base/TextField";

export default {
    name: "StringProperty",
    props: ["value"],
    emits: ["input"],
    components: {
        cgTextField
    },
    methods: {
        link() {
            this.$emit("input", { ...this.value, link: !this.value.link });
        },
        autoUpdate() {
            this.$emit("input", {
                ...this.value,
                autoUpdate: !this.value.autoUpdate
            });
        },
        clear() {
            this.$emit("input", {
                ...this.value,
                value: null
            });
        }
    },
    computed: {
        v: {
            get() {
                return this.value.value;
            },
            set(update) {
                this.$emit("input", { ...this.value, value: update });
            }
        }
    }
};
</script>
