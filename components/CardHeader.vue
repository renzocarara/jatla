
// NOTE: dumb component, only for purpose of display, no logic of data flow
<template>
    <div>
        <v-card-title class="headline justify-center px-0">
                <v-img
                    class="d-inline-block"
                    :src="require('../assets/images/tudus_logo.png')"
                    max-height="45"
                    max-width="45"
                    contain
                ></v-img>
                <span class="font-weight-black title-color text-h3 mr-3">atla</span>
                <!-- visualizzo il day+weekday solo sulla pagina principale -->
                <!-- NOTA: "day" e "weekday" sono dei filtri definiti globalmente -->
                <!-- <div v-if="$nuxt.$route.path=='/'" class="teal lighten-5 blue-grey--text rounded">
                    <div class="date-border d-flex flex-column align-center blue-grey--text rounded">
                        <h3 class="font-weight-medium lh">{{ dateString | day }}</h3>
                        <h5 class="font-weight-medium lh">{{ dateString | weekday }}</h5>
                    </div>
                </div> -->
        </v-card-title>
        <h4 v-if="$nuxt.$route.path=='/'" class="font-weight-medium text-center blue-grey--text">{{ dateString }}</h4>

        <v-card-subtitle v-if="$nuxt.$route.path=='/about'" class="pt-3 pb-0 mb-2 text-h6 text-center blue-grey--text">
            <span class="subtitle-color ">J</span>ust 
            <span class="subtitle-color">A</span>nother 
            <span class="subtitle-color">T</span>odos 
            <span class="subtitle-color">L</span>ist 
            <span class="subtitle-color">A</span>pp 
        </v-card-subtitle>
    </div>  
</template>

<script>
import moment from "moment";
export default {
    data() {
        return {
            dateString: moment().format("dddd, DD MMMM YYYY"),
        };
    },
};
</script>


<style lang="scss" scoped>
//
.date-border {
    border: 2px solid teal;
    padding: 1px 4px;
}
.lh {
    line-height: 1.1;
}
</style>