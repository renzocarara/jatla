<template>
    <v-layout>
        <v-flex>
            <v-card class="mx-auto" max-width="400" color="teal lighten-4">
                <v-card-title class="headline justify-center">
                    <main-title />
                </v-card-title>

                <v-card-subtitle class="pt-3 pb-0 mb-2 text-h6 text-center blue-grey--text">
                    Just Another todos List App 
                </v-card-subtitle>

                <v-card-text class="pb-0">
                    
                    <v-text-field
                      ref="textInput"
                      v-model="task"
                      label="Add a new todo here..."
                      solo color="teal" background-color="teal lighten-5"
                      append-icon="mdi-playlist-plus"
                      @click:append="createTask" @keydown.enter="createTask">
                    </v-text-field>

                    <div v-if="tasks.length > 0">

                        <h2>Total:&nbsp;<span>{{ tasks.length }}</span></h2>

                        <v-divider class="mt-4"></v-divider>

                        <v-row class="my-1" align="center">
                            <strong class="mx-4 text--darken-2">
                              Remaining: {{ remainingTasks }}
                            </strong>

                            <v-divider vertical></v-divider>

                            <strong class="mx-4 text--darken-2">
                              Done: {{ completedTasks }}
                            </strong>

                            <v-spacer></v-spacer>

                            <v-progress-circular :value="progress" color="success" rotate="-90" class="mr-4">
                               {{ progress }}
                            </v-progress-circular>
                        </v-row>

                        <v-divider class="mb-4"></v-divider>

                        <v-card>
                            <div v-for="(task, i) in tasks">
                              <v-divider
                                v-if="i !== 0"
                                :key="`${i}-divider`"
                              ></v-divider>

                              <v-list-item :key="`${i}-task`" class="px-2">
                                <v-icon class="mr-2" @click="deleteTask(i)">mdi-trash-can-outline</v-icon>
                                <v-list-item-action>
                                  <!-- quadratino della checkbox -->
                                  <v-checkbox
                                    v-model="task.done"
                                    :color="task.done ? 'grey' : ''"
                                  >
                                  </v-checkbox>
                                </v-list-item-action>

                                <!-- testo accanto al quadratino della checkbox -->
                                <span v-if="taskToEditIndex==null || i!=taskToEditIndex"
                                    class="ml-3 break-word clickable"
                                    :class="task.done ? 'grey--text' : 'teal--text'"
                                    @click="editTask(i)">
                                    {{ task.text }}
                                </span>

                                <!-- text-field per editare il task -->
                                <v-text-field v-else
                                    id="text-edit"
                                    class="pl-3"
                                    ref="textEdit"
                                    height="30"
                                    dense
                                    v-model="task.text"
                                    color="teal" background-color="teal lighten-5"
                                    append-icon="mdi-content-save"
                                    @click:append="updateTask" @keydown.enter="updateTask">
                                </v-text-field>

                                <v-spacer></v-spacer>

                                <!-- baffo che indica task completato -->
                                <v-scroll-x-transition>
                                  <v-icon
                                    large
                                    v-if="task.done"
                                    color="success"
                                  >
                                    mdi-check
                                  </v-icon>
                                </v-scroll-x-transition>

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
                
                
                <hr v-if="tasks.length > 0" class="my-3" />
                <v-card-actions  v-if="tasks.length > 0">
                    <v-spacer />
                    <v-btn
                        dark
                        color="blue-grey"
                        nuxt
                        @click="deleteAllTasks"
                    >
                        <v-icon>mdi-trash-can-outline</v-icon> All
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>

        <!-- finestra di avviso se non è disponibile il localStorage del browser -->
        <v-dialog
          v-model="localStorageDialog"
          max-width="290"
        >
          <v-card>
            <v-card-title class="headline">Warning: <br> Local Storage issue</v-card-title>

            <v-card-text>
              Your browser doesn't support Local Storage. This app can still run but with limitations. Data persistency is not achievable.
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>  
              <v-btn
                color="blue-grey"
                dark
                @click="localStorageDialog = false"
              >
                Continue
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

    </v-layout>
</template>



<script>
import MainTitle from "~/components/MainTitle.vue";

export default {
    components: {
        MainTitle,
    },
    mounted() {
        // intercetto l'evento chiusura tab/window del browser
        window.addEventListener("beforeunload", this.isClosing);

        // verifico se il browser supporta il localStorage
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
            this.localStorageDialog = true;
            console.log(
                "browser localStorage not available! Web App will execute with some limitations!!"
            );
        }
        // posiziono il focus sul v-text-field di input
        this.focusOnTextField();
    },
    beforeDestroy() {
        // aggiorno Local Storage (se supportato)
        this.setLocalStorage();
    },
    data: () => ({
        // indica se il browser supporta il localStorage
        localStorageAvailable: false,
        // abilita finestra di avviso se il browser NON supporta il localStorage
        localStorageDialog: false,

        // array che mi conterrà i task inseriti
        tasks: [],
        // task inserito dall'utente
        task: null,

        // è l'indice del task che l'utente vuole editare
        taskToEditIndex: null,
    }),

    computed: {
        completedTasks() {
            // calcolo quanti task risultano completati
            // la filter mi restituisce un array con solo i task che hanno la proprità "done"=true
            // la length mi conta gli elementi di questo array creat dalla filter
            return this.tasks.filter((task) => task.done).length;
        },
        progress() {
            // calcolo la percentuale di task completati (solo valore intero, no decimali)
            return ((this.completedTasks / this.tasks.length) * 100).toFixed(0);
        },
        remainingTasks() {
            // calcolo quanti task risultano da completare
            return this.tasks.length - this.completedTasks;
        },
    },

    methods: {
        focusOnEditField() {
            // setto il focus sul v-text-field di input
            this.$refs.textEdit.focus();
        },
        editTask(taskToEditIndex) {
            console.log("edit...");
            // faccio apparire un v-text-field e faccio sparire lo span con il testo
            this.taskToEditIndex = taskToEditIndex;

            // NOTA: qui ancora il v-text-field non è stato renderizzato, per cui per settare il focus devo aspettare
            // che  l'elemento esista nel DOM, quindi uso la "nextTick()" che aspetta il prossimo aggiornamento del DOM
            this.$nextTick(() => {
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
            console.log("update...");
            // faccio sparire il v-text-field e faccio riapparire lo span con il testo
            this.taskToEditIndex = null;
        },
        isClosing() {
            // aggiorno Local Storage (se supportato)
            this.setLocalStorage();
        },
        setLocalStorage() {
            if (this.localStorageAvailable) {
                // scrivo l'array in Local Storage
                localStorage.setItem("jatlaTasks", JSON.stringify(this.tasks));

                console.log(
                    "jatlaTasks:",
                    JSON.parse(localStorage.getItem("jatlaTasks"))
                );
            }
        },
        getLocalStorage() {},
        createTask() {
            if (this.task !== null) {
                // rimuovo dall'input eventuali leading and trailing blanks
                let trimmedInput = this.task.trim();
                if (trimmedInput !== "") {
                    // aggiungo il task nell'array "tasks"
                    this.tasks.push({
                        done: false,
                        text: trimmedInput,
                    });
                }
                // resetto l'input
                this.task = null;
            }
        },
        focusOnTextField() {
            // setto il focus sul v-text-field di input
            this.$refs.textInput.focus();
        },
        deleteAllTasks() {
            // TBD eventuale finestra di verifica "Do you really want to remove all task?"

            // svuoto l'array dei task
            this.tasks = [];
            // setto il focus sul TextField
            this.focusOnTextField();
        },
        deleteTask(i) {
            // TBD eventuale finestra di verifica "Do you really want to remove this task?"

            // rimuovo il singolo task
            this.tasks.splice(i, 1);
        },
    },
};
</script>
<style lang="scss" scoped>
.task-list {
    background-color: $teal-lighten-5;
}
.break-word {
    word-break: break-word;
}
.clickable {
    cursor: pointer;
}

::v-deep .v-list-item .v-text-field .v-input__control {
    height: 30px;
}
::v-deep .v-list-item .v-input__append-inner {
    padding-left: 10px;
    margin-bottom: 5px;
}
</style>
