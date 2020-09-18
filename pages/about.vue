<template>
    <v-layout>
        <v-flex>
            <v-card class="mx-auto view-port" width="400" color="teal lighten-4">

                <card-header />

                <v-card-text class="pb-0">
                    <h4>VERSION</h4>
                    <p>
                        v1.0.0
                    </p>
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
                        Allow to create a classic Todo List.<br/>
                        Data is saved in a persistent way through the browser's LocalStorage.
                        If LocalStorage is not available in your browser, a warning message is displayed.<br/>
                        You can:
                        <ul>
                            <li>Add, modify and delete tasks.</li>
                            <li>Toggle task's status between "Pending" and "Done"</li>
                            <li>Filter tasks based on status.</li>
                        </ul>
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
import CardHeader from "~/components/CardHeader.vue";

export default {
    components: {
        CardHeader,
    },
    head() {
        return {
            titleTemplate: "%s - " + "Todos List App - About",
            title: "JATLA",
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: "description",
                    name: "About Page",
                    content: "Information about JATLA web App",
                },
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
//
h4 {
    color: teal;
}
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