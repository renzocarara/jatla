
// NOTE: dumb component, only for purpose of display, no logic of data flow
<template>
    <div>
        <v-card-title class="headline justify-center">
                <v-img
                    class="d-inline-block mr-2"
                    :src="require('../assets/images/tudus_logo.png')"
                    max-height="45"
                    max-width="45"
                    contain
                ></v-img>
                <span class="font-weight-black title-color text-h3 mr-3">Jatla</span>
                <div v-if="$nuxt.$route.path=='/'" class="teal lighten-5 blue-grey--text">
                    <div class="date-border d-flex flex-column align-center blue-grey--text rounded">
                        <h3 class="font-weight-medium lh08">{{ dateString | day }}</h3>
                        <h5 class="font-weight-medium lh09">{{ dateString | weekday }}</h5>
                    </div>
                </div>
        </v-card-title>

        <v-card-subtitle class="pt-3 pb-0 mb-2 text-h6 text-center blue-grey--text">
            <span class="title-color">J</span>ust 
            <span class="title-color">A</span>nother 
            <span class="title-color">T</span>odos 
            <span class="title-color">L</span>ist 
            <span class="title-color">A</span>pp 
        </v-card-subtitle>
    </div>  
</template>

<script>
import moment from "moment";
export default {
    filters: {
        day: function (value) {
            if (value) {
                return moment(String(value)).format("D");
            }
        },
        weekday: function (value) {
            if (value) {
                return moment(String(value)).format("ddd");
            }
        },
    },
    data() {
        return {
            dateString: moment(),
        };
    },
};
</script>


<style lang="scss" scoped>
//
.date-border {
    border: 2px solid teal;
    padding: 2px 4px;
}
.lh08 {
    line-height: 0.8;
}
.lh09 {
    line-height: 0.9;
}
</style>