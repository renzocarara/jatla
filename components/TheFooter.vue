<template>
    <v-footer absolute color="teal lighten-3" app>
        <span>
            <a
                class="blue-grey--text text-decoration-none"
                href="https://www.renzocarara.it/"
                target="_blank"
                rel="noopener"
                >Renzo Carara - &copy; {{ new Date().getFullYear() }}
            </a>
        </span>
        <v-spacer></v-spacer>
        <nuxt-link class="link blue-grey--text text-decoration-none" to="/">Home</nuxt-link>
        <span class="blue-grey--text mx-2">|</span>
        <nuxt-link class="link blue-grey--text text-decoration-none" to="/about">About</nuxt-link>
    </v-footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>
