<template>
    <v-dialog
      v-model="dialogVisibility"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Warning: <br> Local Storage issue</v-card-title>

        <v-card-text>
          Your browser doesn't support Local Storage. This app can still run but with string limitations. Data persistence is not achievable.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>  
          <v-btn
            color="blue-grey"
            dark
            @click="hideDialog"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    data: () => ({
        // nasconde/visualizza la finestra di dialogo
        dialogVisibility: true,
    }),
    methods: {
        hideDialog() {
            this.dialogVisibility = false;
            // "emette" un evento verso "l'alto" per avvisare che la finestra di dialogo è stata chiusa
            this.$emit("emitLocalStorageDialogDismissed");
        },
    },
};
</script>
<style lang="scss" scoped>
</style>
