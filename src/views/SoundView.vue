<script setup>
</script>
<template>
    <div class="w-full h-screen bg-backgroundColor text-textColor p-4">
        <div class="">
            <label for="soundLevel" >sound level</label> 
            <div class="range-slider">
              <input v-model="soundLevel" class="range-slider__range" type="range" value="25" min="1" max="50">
                <span class="range-slider__value">{{ soundLevel }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { useConfigurationStore } from "../store.js";

export default {
    name: "SoundView",
    data(){
        return {
            soundLevel:0,
            sound:"typing",
            on:true,
        }
    },
    components: {
        save(){
        }
    },
};
</script>

<style>

</style>
