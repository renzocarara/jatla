<template>
    <v-footer class="d-flex justify-center" fixed color="teal lighten-3" app padless>
        <!-- <div class="d-flex flex-column align-center" > -->
        <div class="text-center">

            <div class="footer-link">
                <a
                    class="link-hover text-h6 blue-grey--text  text-center text-decoration-none"
                    href="https://www.renzocarara.it/"
                    target="_blank"
                    rel="noopener"
                    >Renzo Carara - &copy; {{ new Date().getFullYear() }}
                </a>
            </div>

            <div>
                <nuxt-link class="text-h6 blue-grey--text text-decoration-none" to="/">Home</nuxt-link>
                <span class="text-h6 blue-grey--text mx-2">|</span>
                <nuxt-link class=" text-h6 blue-grey--text  text-decoration-none" to="/about">About</nuxt-link>
            </div>
        </div>
    </v-footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer-link {
    height: 20px;
}
.nuxt-link-exact-active {
    font-weight: 900;
}
</style>
