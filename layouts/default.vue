<template>
    <v-app>
        <v-main class="d-flex align-center teal lighten-3">
            <v-container class="px-2">
                <nuxt />
            </v-container>
        </v-main>
        <the-footer />
    </v-app>
</template>

<script>
import TheFooter from "~/components/TheFooter.vue";

export default {
    components: {
        TheFooter,
    },
};
</script>
<style lang="scss" scoped>
</style>
