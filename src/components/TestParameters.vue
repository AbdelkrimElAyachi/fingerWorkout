<script setup>
</script>
<template>
    <div class="">
        <div class="container" style="left: 85px;">
          <div>
            <select class="select" v-model="duration" >
              <option v-for="n in 10" :key="n" :value="n"> {{ n }} Minute(s) </option>
            </select>
          </div>
        </div>
        <div class="triangle" style="left:95px;bottom:65px;" />
    </div>
</template>

<script>
import { useParameterStore } from "@/store.js";

export default {
    name: "TestParameters",
    data(){
        return {
            duration: 1,
        }
    },
    created(){
        this.duration = useParameterStore.getDuration;
    },
    watch: {
        duration(newV,oldV){
            useParameterStore.setDuration(newV);
        }
    },
};
</script>

<style>
.container{
    padding: 10px;
}
</style>
