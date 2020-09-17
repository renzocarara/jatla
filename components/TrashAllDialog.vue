<template>
    <!-- finestra di avviso per conferma o cancellazione-->
    <v-dialog
        v-model="dialogVisibility"
        max-width="290"
    >
        <v-card>
        <v-card-title class="headline">{{ dialogTitleLabel }}: <br> {{ dialogTitleText }}</v-card-title>
            
        <v-card-text>{{ dialogMessage }}</v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>  
            <v-btn
            color="blue-grey"
            dark
            @click="confirm"
            >
            {{ dialogConfirmBtn }}
            </v-btn>
            <v-btn
            color="blue-grey"
            dark
            @click="cancel"
            >
            {{ dialogCancelBtn }}
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: [
        "dialogTitleLabel",
        "dialogTitleText",
        "dialogMessage",
        "dialogConfirmBtn",
        "dialogCancelBtn",
    ],
    data: () => ({
        // nasconde/visualizza la finestra di dialogo
        dialogVisibility: true,
    }),
    methods: {
        confirm() {
            this.dialogVisibility = false;
            // "emette" un evento verso "l'alto" per avvisare che l'utente ha confermato
            this.$emit("emitConfirmed");
        },
        cancel() {
            this.dialogVisibility = false;
            // "emette" un evento verso "l'alto" per avvisare che l'utente ha cancellato
            this.$emit("emitCancelled");
        },
    },
};
</script>
<style lang="scss" scoped>
</style>

