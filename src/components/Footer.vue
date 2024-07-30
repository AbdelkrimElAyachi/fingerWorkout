<template>
    <div class="footer">
        <button @click="sound" class="hover:text-primary">sound</button>
        <div v-if="openWindow">
            <SoundParameters />
        </div>
        <button @click="layout">keyboard Layout</button>
        <button @click="difficulty">Difficulty</button>
    </div>
</template>

<script>
import SoundParameters from "./SoundParameters.vue";

export default {
    name:"Footer",
    data(){
        return {
            openWindow:"",
        }
    },
    components:{
        SoundParameters,
    },
    methods: {
        sound(){
            this.openWindow != "sound" ? this.openWindow = "sound" : this.openWindow = "";
        },
        layout(){
            this.openWindow != "layout" ? this.openWindow = "layout" : this.openWindow = "";
        },
        difficulty(){
            this.openWindow != "difficulty" ? this.openWindow = "difficulty" : this.openWindow = "";
        }
    }
}
</script>

<style>
.footer{
    position:absolute;
    bottom:0;
    padding:1rem;
    display:flex;
    gap:2rem;
}
</style>
