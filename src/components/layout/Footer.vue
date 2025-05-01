<template>
    <div class="absolute bottom-0 p-6 flex gap-6">
        <button @click="sound" class="hover:text-primary">sound</button>
        <button @click="parameters">test parameters</button>
        <div v-if="openWindow=='sound'">
            <SoundParameters />
        </div>
        <div v-else-if="openWindow=='parameters'">
            <TestParameters />
        </div>
    </div>
</template>

<script>
import SoundParameters from "@/components/SoundParameters.vue";
import TestParameters from "@/components/TestParameters.vue";

export default {
    name:"Footer",
    data(){
        return {
            openWindow:"",
        }
    },
    components:{
        SoundParameters,
        TestParameters
    },
    methods: {
        sound(e){
            e.target.blur();
            this.openWindow != "sound" ? this.openWindow = "sound" : this.openWindow = "";
        },
        parameters(e){
            e.target.blur();
            this.openWindow != "parameters" ? this.openWindow = "parameters" : this.openWindow = "";
        }
    }
}
</script>

<style>
</style>