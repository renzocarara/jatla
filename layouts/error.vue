<template>
    <v-layout>
        <v-flex>
            <v-card class="mx-auto" max-width="400" color="teal lighten-4">
                <v-card-title class="headline justify-center">
                    <main-title />
                </v-card-title>

                <v-card-subtitle class="pt-3 pb-0 mb-2 text-h6 text-center blue-grey--text">
                     <span class="title-color">J</span>ust 
                     <span class="title-color">A</span>nother 
                     <span class="title-color">T</span>odos 
                     <span class="title-color">L</span>ist 
                     <span class="title-color">A</span>pp
                     <br>
                    <span
                        ><v-icon size="30" color="teal accent-4"
                            >mdi-alert-circle-outline</v-icon
                        ></span
                    >Warning!
                </v-card-subtitle>

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
import MainTitle from "~/components/MainTitle.vue";

export default {
    components: {
        MainTitle,
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

    layout: "empty",
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
                    name: "Pagina di errore",
                    content: "Errore",
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
</style>
