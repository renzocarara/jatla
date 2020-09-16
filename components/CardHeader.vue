
// NOTE: dumb component, only for purpose of display, no logic of data flow
<template>
    <div>
        <v-card-title class="headline justify-center">
            <h1>
                <v-img
                    class="d-inline-block"
                    :src="require('../assets/images/tudus_logo.png')"
                    max-height="45"
                    max-width="45"
                    contain
                ></v-img>
                <span class="title-color">Jatla</span>
            </h1>            
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

<style lang="scss" scoped>
//
</style>