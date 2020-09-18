<template>
    <v-layout>
        <v-card class="mx-auto view-port" width="400" color="teal lighten-4">

            <card-header />
           
            <v-card-text class="pb-0 pt-1">

                <text-input @emitTask="saveTask" />

                <!-- <v-divider class="mb-4"></v-divider> -->

                <div v-if="listNotEmpty">

                    <!-- <v-progress-circular :value="progress" color="success" rotate="-90" class="mr-4">
                        {{ progress }}
                    </v-progress-circular> -->

                    <!-- slider per selezionare quali task visualizzare: "all", "done" o "pending" -->
                    <v-slider class="mt-5 mb-3"
                        v-model="sliderSelection"
                        :tick-labels="ticksLabels"
                        :max="2"
                        step="1"
                        color="teal"
                        track-color="teal"
                        ticks="always"
                        tick-size="0"
                        thumb-label="always"
                        thumb-color="teal lighten-2"
                        @click="sliderClicked"
                    >
                        <!-- uso v-slot per settare il valore di thumb-label -->
                        <template v-slot:thumb-label>
                            <strong class="fz18">{{taskNumbers[sliderSelection]}}</strong>
                        </template>
                    </v-slider>


                    <v-card >
                        <div v-for="(task, i) in tasks">
                            <v-divider
                            v-if="i !== 0  && taskSubset.includes(task.done.toString())"
                            :key="`${i}-divider`"
                            ></v-divider>

                            <v-list-item :key="`${i}-task`" class="px-2" v-if="taskSubset.includes(task.done.toString())">
                                <v-list-item-action>
                                    <!-- quadratino della checkbox -->
                                    <v-checkbox
                                    v-model="task.done"
                                    :color="task.done ? 'green' : ''"
                                    @click="updateTaskStatus(i, task.done)">
                                    </v-checkbox>
                                </v-list-item-action>

                                <!-- nome del task, è il testo accanto al quadratino della checkbox -->
                                <span v-if="taskToEditIndex==null || i!=taskToEditIndex"
                                    class="task-text"
                                    :class="task.done ? 'text-done' : 'text-pending'"
                                    @click="editTask(i)">
                                    <strong>{{ task.text }}</strong>
                                </span>
                                
                                <!-- text-field per editare il nome del task -->
                                <v-text-field v-else
                                    class="pl-3 fz18"
                                    ref="textEdit"
                                    dense
                                    v-model="task.text"
                                    color="teal" background-color="teal lighten-5"
                                    append-icon="mdi-content-save"
                                    @click:append="updateTask" @keydown.enter="updateTask" @blur="updateTask">
                                </v-text-field>

                                <v-spacer></v-spacer>
                                <v-icon class="ml-1" @click="deleteTask(i)">mdi-trash-can-outline</v-icon>

                            </v-list-item>
                        </div>
                    </v-card>
                </div>
                <!-- <div v-else>
                    <h2 class="text-center pb-3">
                    Your Todos List is empty!
                    </h2>
                </div> -->

            </v-card-text>
            
            <div v-if="listNotEmpty">
                <hr class="my-3" />
                <v-card-actions >
                    <v-spacer />
                    <v-btn class="mr-2"
                        dark
                        color="blue-grey"
                        nuxt
                        @click="deleteAllTasksDialog=true"
                    >
                        <v-icon>mdi-trash-can-outline</v-icon> All
                    </v-btn>
                </v-card-actions>
            </div>
        </v-card>

        <!-- finestra di avviso se non è disponibile il localStorage del browser -->
        <local-storage-dialog v-if="showLocalStorageDialog" @emitLocalStorageDialogDismissed="setFocusOnTextInput"/>
        
        <!-- finestra di avviso per la cancellazione di tutti i task -->
        <trash-all-dialog v-if="deleteAllTasksDialog"
        @emitConfirmed="deleteAllTasksConfirmed" @emitCancelled="deleteAllTasksCancelled" 
        :dialogTitleLabel="dialogTitleLabel"
        :dialogTitleText="dialogTitleText"
        :dialogMessage="dialogMessage"
        :dialogConfirmBtn="dialogConfirmBtn"
        :dialogCancelBtn="dialogCancelBtn"
        />
    </v-layout>
</template>



<script>
import CardHeader from "~/components/CardHeader.vue";
import TextInput from "~/components/TextInput.vue";
import LocalStorageDialog from "~/components/LocalStorageDialog.vue";

export default {
    components: {
        CardHeader,
        TextInput,
        LocalStorageDialog,
    },
    mounted() {
        // mi metto in ascolto  dell'evento chiusura tab/window del browser e quando lo intercetto
        // aggiorno Local Storage (se supportato)
        // ATTENZIONE SEMBRA NON FUNZIORE SU CHROME ANDROID
        // window.addEventListener("beforeunload", this.setLocalStorage);

        // recupero la lista task ("jatlaTasks"), se presente nel localStorage
        this.getLocalStorage();

        // // setto il focus sul v-text-field di input
        // this.$refs.textInput.focus();
    },
    data() {
        return {
            // indica se il browser supporta il localStorage
            localStorageAvailable: false,
            // abilita finestra di avviso se il browser NON supporta il localStorage
            showLocalStorageDialog: false,

            // array che mi conterrà tutti i task inseriti
            tasks: [],

            // è l'indice del task che l'utente vuole editare
            taskToEditIndex: null,

            // abilita finestra di avviso per chiedere conferma della cancellazione di tutti i task
            deleteAllTasksDialog: false,
            // props da passare alla finestra di dialogo
            dialogTitleLabel: "Warning",
            dialogTitleText: "Clear ALL",
            dialogMessage:
                "You're are gonna delete all the Tasks in your List! Do you really want to proceed?",
            dialogConfirmBtn: "DELETE",
            dialogCancelBtn: "CANCEL",

            // slider per filtrare i task
            sliderSelection: 1, // All
            taskSubset: ["true", "false"],
            ticksLabels: ["Pending", "All", "Done"],
        };
    },
    head() {
        return {
            titleTemplate: "%s - " + "Todos List App",
            title: "JATLA",
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                {
                    hid: "description",
                    name: "Main Page",
                    content: "JATLA web App",
                },
            ],
        };
    },
    computed: {
        listNotEmpty() {
            // indica se c'è almeno 1 task nella lista dei Todos
            return this.tasks.length > 0;
        },

        taskNumbers() {
            // calcolo quanti task risultano completati
            // NOTA: la filter mi restituisce un array con solo i task che hanno la proprità "done"=true
            // la length mi conta gli elementi di questo array creato dalla filter
            let done = this.tasks.filter((task) => task.done).length;

            // calcolo quanti task risultano da completare
            let pending = this.tasks.length - done;

            // ritorno un array con 3 info [pending, all, done]
            return [pending, pending + done, done];
        },
        progress() {
            // calcolo la percentuale di task completati (solo valore intero, no decimali)
            return ((this.taskNumbers[2] / this.tasks.length) * 100).toFixed(0);
        },
    },

    methods: {
        editTask(taskToEditIndex) {
            // DESCRIZIONE:
            // visualizza un text-field per permetter all'utente di modificare l descrizione del task

            // faccio apparire un v-text-field per l'edit e faccio sparire lo span con il testo
            this.taskToEditIndex = taskToEditIndex;

            // NOTA: qui ancora il v-text-field non è stato renderizzato, per cui per settare il focus devo aspettare
            // che  l'elemento esista nel DOM, quindi uso la "nextTick()" che aspetta il prossimo aggiornamento del DOM
            this.$nextTick(() => {
                // DESCRIZIONE:
                // setto il focus sul v-text-field del task da editare
                // console.log("this.$refs", this.$refs); // elenco degli elementi che hanno un attributo "ref" associato
                // console.log("this.$refs.textEdit[0]", this.$refs.textEdit[0]);
                // il ref "textEdit" è un array (perchè definito in un loop v-for), per cui per accederci devo usare la
                // square notation, con indice "0", l'array avrà sempre 1 solo elemento, perchè renderizzo l'elemento
                // che ha ref="textEdit" quando entro nel v-else, e ciò accade solo 1 volta all'interno di tutto il loop v-for
                this.$refs.textEdit[0].focus();
            });
        },
        updateTask() {
            // DESCRIZIONE:
            // viene chiamata in tre casi mentre l'utente è in fase di edit:
            // l'utente preme ENTER, clicca sull'icona floppy o sposta il focus

            // faccio sparire il v-text-field per l'edit e faccio riapparire lo span con il testo
            this.taskToEditIndex = null;
            // aggiorno localStorage
            this.setLocalStorage();
        },
        setLocalStorage() {
            // DESCRIZIONE:
            // verifico se localStorage è disponibile e nel caso ci scrivo i dati (array tasks)

            if (this.localStorageAvailable) {
                // scrivo l'array in Local Storage
                localStorage.setItem("jatlaTasks", JSON.stringify(this.tasks));

                console.log(
                    "salvato jatlaTasks:",
                    JSON.parse(localStorage.getItem("jatlaTasks"))
                );
            }
        },
        getLocalStorage() {
            // DESCRIZIONE:
            // questo metodo viene richiamato nell'hook "mounted"
            // verifico se localStorage è disponibile e memorizzo l'informazione in un flag,
            // poi leggo da loacalStorage i dati ("jatlaTasks")
            // se il browser non supporta Local Storage, viene visualizzato un messaggio di avviso

            // verifico se il browser supporta il localStorage, uso la libreria (customizzata) Modernizr
            if (Modernizr.localstorage) {
                console.log("browser localStorage available!");
                this.localStorageAvailable = true;
                // verifico se è definito nel Local Storage l'array dei task
                if (JSON.parse(localStorage.getItem("jatlaTasks")) !== null) {
                    console.log("jatlatasks esiste");
                    this.tasks = JSON.parse(localStorage.getItem("jatlaTasks"));
                } else {
                    console.log("jatlatask non esiste!");
                }
            } else {
                //dialog che avvisa LocalStorage not available!
                this.showLocalStorageDialog = true;
                console.log(
                    "browser localStorage not available! Web App will execute with some limitations!!"
                );
            }
        },

        saveTask(emittedTask) {
            // DESCRIZIONE:
            // ricevo il dato (nome del task) dal componente InputText e aggiorno la lista dei task

            // aggiungo il task inserito dall'utente nell'array "tasks"
            this.tasks.push({
                done: false,
                text: emittedTask,
            });

            // aggiorno localStorage
            this.setLocalStorage();

            // rimuovo il focus sul v-text-field di input per evitare che la virtual keyboard su mobile rimanga visualizzata
            this.$el.querySelector("#text-input").blur();
        },

        updateTaskStatus(index, status) {
            // DESCRIZIONE:
            // aggiorno lo status del task nella lista dei task

            // aggiorno il task
            this.tasks[index].done = status;

            // aggiorno localStorage
            this.setLocalStorage();
        },

        deleteAllTasksConfirmed() {
            // DESCRIZIONE:
            // cancello tutta la lista dei task, prima di procedere
            // viene visualizzata una finestra che chiede conferma all'utente

            // svuoto l'array dei task
            this.tasks = [];

            // aggiorno localStorage
            this.setLocalStorage();

            // chiudo la finestra di dialogo
            this.deleteAllTasksDialog = false;

            this.$nextTick(() => {
                // setto il focus sul v-text-field di input, con la nextTick, aspetto che Vue abbia aggiornato il DOM,
                // rimuovendo la finestra di dialog che appare sopra tutto
                this.$el.querySelector("#text-input").focus();
            });
        },
        deleteAllTasksCancelled() {
            // DESCRIZIONE:
            // l'utente a abortito l'operazione di cancellazione di tutti i tasks

            // ripristino il flag della finestra di dialogo
            this.deleteAllTasksDialog = false;
        },
        deleteTask(i) {
            // DESCRIZIONE:
            // cancello un singolo task dalla lista

            // rimuovo il singolo task
            this.tasks.splice(i, 1);

            // aggiorno localStorage
            this.setLocalStorage();
        },
        setFocusOnTextInput() {
            // DESCRIZIONE:
            // setta il focus sul text-field di input

            this.$nextTick(() => {
                // setto il focus sul v-text-field di input, con la nextTick, aspetto che Vue abbia aggiornato il DOM,
                // rimuovendo la finestra di dialog che appare sopra tutto
                this.$el.querySelector("#text-input").focus();
            });
        },
        sliderClicked() {
            // DESCRIZIONE:
            // traduce la selezione dell'utente (fatta tramite slider) in un array che viene poi utilizzato
            // nel ciclo v-for di renderizzazione dei task, per creare a lista task

            if (this.sliderSelection == 0) {
                this.taskSubset = ["false"]; // Pending
            } else if (this.sliderSelection == 1) {
                this.taskSubset = ["true", "false"]; // All
            } else {
                this.taskSubset = ["true"]; // Done
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.task-list {
    background-color: $teal-lighten-5;
}
.task-text {
    word-break: break-word;
    cursor: pointer;
    font-size: 18px;
}

// formattazione riquadrino che contiene la data
::v-deep .v-list-item .v-text-field .v-input__control {
    height: 30px;
}
::v-deep .v-list-item .v-input__append-inner {
    padding-left: 10px;
    margin-bottom: 5px;
}

// formattazione slider
::v-deep .v-slider__tick-label {
    cursor: pointer;
    color: white;
    border-radius: 4px;
    padding: 3px 6px;
    font-size: 16px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    transition-duration: 0.28s;
    transition-property: box-shadow, transform, opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0.8;
}
::v-deep .v-slider__tick-label:hover {
    opacity: 0.7;
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
}

// formattazione checkbox - ridotto margine tra quadratino e testo
.v-application--is-ltr .v-list-item__action:first-child {
    margin-right: 12px;
}

::v-deep .v-slider__tick:nth-child(3) .v-slider__tick-label {
    background-color: green;
}
::v-deep .v-slider__tick:nth-child(1) .v-slider__tick-label {
    background-color: orange;
}
::v-deep .v-slider__tick:nth-child(2) .v-slider__tick-label {
    background-color: gray;
}
.text-pending {
    color: orange;
    font-weight: bold;
}
.text-done {
    color: green;
    font-style: italic;
    opacity: 0.5;
}
</style>
