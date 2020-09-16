<template>
    <v-app>
        <v-main class="d-flex align-center teal lighten-3">
            <v-container>
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
<template>
       <v-text-field
            id="text-input"
            v-model="task"
            placeholder="Add a new todo here..."
            solo color="teal" background-color="teal lighten-5"
            append-icon="mdi-playlist-plus"
            @click:append="checkInput" @keydown.enter="checkInput">
        </v-text-field>
</template>

<script>
export default {
    mounted() {
        // setto il focus sul v-text-field di input
        this.$el.querySelector("#text-input").focus();
    },
    data: () => ({
        // singolo task inserito dall'utente
        task: null,
    }),
    methods: {
        checkInput() {
            // DESCRIZIONE:
            // verifica la validità dell'input, se il dato è un input valido viene passato al
            // componente chiamante generando un evento con $emit
            if (this.task !== null) {
                // rimuovo dall'input eventuali leading and trailing blanks
                let trimmedInput = this.task.trim();
                if (trimmedInput !== "") {
                    // "emette" un evento verso "l'alto" per passare il dato di input al componente padre
                    this.$emit("emitTask", trimmedInput);
                }
                // resetto l'input (v-text-field)
                this.task = null;
            }
        },
    },
};
</script>
<style lang="scss" scoped>
</style>
