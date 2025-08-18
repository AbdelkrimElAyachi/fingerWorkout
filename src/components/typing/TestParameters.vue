<script setup>
</script>
<template>
    <div class="">
        <div class="container" style="left: 95px;">
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
import { useParameterStore } from "@/stores";

export default {
    name: "TestParameters",
    data(){
        return {
            duration: 1,
        }
    },
    created(){
        const store = useParameterStore();
        this.duration = store.getDuration;
    },
    watch: {
        duration(newV,oldV){
            const store = useParameterStore();
            store.setDuration(newV);
        }
    },
};
</script>

<style>
.container{
    padding: 10px;
}
</style>
