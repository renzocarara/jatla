<template>
    <v-layout>
        <v-flex>
            <v-card class="mx-auto" width="400" color="teal lighten-4">

                <card-header />

                <v-card-text  class="text-center">
                    <img
                        style="max-width: 100%;"
                        class="text-center"
                        src="@/assets/images/error404.png"
                        alt="error 404 img"
                    />
                    <h2 v-if="error.statusCode === 404">
                        {{ pageNotFound }}
                    </h2>
                    <h2 v-else>
                        {{ otherError }}
                    </h2>
                </v-card-text>
                <hr class="my-3" />
                <v-card-actions>
                    <v-spacer />
                    <v-btn dark color="blue-grey" nuxt to="/">
                        Home
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import CardHeader from "~/components/CardHeader.vue";

export default {
    components: {
        CardHeader,
    },
    props: {
        error: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            pageNotFound: "Page not found",
            otherError: "Something went wrong!",
        };
    },
    head() {
        const title =
            this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
        return {
            titleTemplate: "Jatla - Todos List App - " + "%s",
            title,
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: "description",
                    name: "Error Page",
                    content: "Error",
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
</style>
