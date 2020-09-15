<template>
    <v-layout>
        <v-flex>
            <v-card class="mx-auto" max-width="400" color="teal lighten-4">
                <v-card-title class="headline justify-center">
                    <main-title />
                    <span class="version pt-8 pl-1">v1.0.0</span>
                </v-card-title>

                <v-card-subtitle class="pt-3 pb-0 mb-2 text-h6 text-center blue-grey--text">
                     <span class="title-color">J</span>ust 
                     <span class="title-color">A</span>nother 
                     <span class="title-color">T</span>odos 
                     <span class="title-color">L</span>ist 
                     <span class="title-color">A</span>pp
                </v-card-subtitle>

                <v-card-text class="pb-0">
                    <h4>SCOPE</h4>
                    <p>
                        This web app is an exercise about the framework
                        <a
                            href="https://nuxtjs.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            >Nuxt.js
                        </a>
                    </p>
                    <h4>HOW IT WORKS</h4>
                    <p>
                        Allow to create a classic Todo List.<br/> Data is saved in a persistent way through the browser's LocalStorage.
                        If LocalStorage is not available in your browser, a warning message is displayed.<br/>
                        You can add, modify and delete tasks. You can toggle task status between "Done" and "Remaining" through the related checkbox.
                    </p>
                    
                    
                    <h4>TECHNOLOGIES</h4>
                    <ul>
                        <li>NUXT.JS v2.14.4</li>
                        <li>VUE.JS v2.6.11</li>
                        <li>VUETIFY v2.3.10</li>
                    </ul>
                    <br />
                    <h4>CREDITS</h4>
                    <p>
                        Free deploy on
                        <br />
                        <a
                            href="https://netlify.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            ><img
                                class="netlify-logo"
                                src="@/assets/images/netlify_logo.png"
                                alt="netlify logo"
                            />
                        </a>
                    </p>

                </v-card-text>
                
                
                <hr class="my-3" />
                <v-card-actions>
                    <v-spacer />
                    <v-btn dark color="blue-grey accent-4" nuxt to="/">
                        Back
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
};
</script>

<style lang="scss" scoped>
//
.netlify-logo {
    width: 98px;
    height: 35px;
    vertical-align: text-bottom;
}
.vert-align-base {
    vertical-align: baseline;
}
.version {
    font-size: 20px;
}
</style>