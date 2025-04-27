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

.select{
    border:solid var(--color-white) 2px;
    background:transparent;
    width:100%;
    padding:4px;
    cursor:pointer;
}
.select option{
    color: black;
}
.triangle{
    position:absolute;
    width: 0;
    height: 0;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-top: 25px solid var(--color-primary);
    animation: triangle 0.6s infinite alternate;
}
@keyframes triangle{
    from  {transform: translateY(0);}
    to {transform: translateY(15px);}
}
.container{
    border: solid var(--color-text) 3px;
    border-radius: 10px 10px 10px 0;
    position:absolute;
    width:200px;
    padding: 10px;
    bottom:100px;
    text-align:center;
}

.slider {
  width: 100%;
  margin: 1rem auto;
}

input[type="range"] {
  -webkit-appearance: none !important;
  width: 100%;
  height: 15px;
  background-color: transparent;
  border: 1px solid var(--color-white);
  border-radius: 10px;
  margin: auto;
  transition: all 0.3s ease;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none !important;
  width: 20px;
  height: 20px;
  background-color: var(--color-white);
  border: solid var(--color-primary) 2px;
  border-radius: 30px;
  box-shadow: 0px 0px 3px #3c6d59;
  transition: all 0.5s ease;
}
input[type="range"]::-webkit-slider-thumb:hover {
  width:25px;
  height:25px;
  background-color: var(--color-bg);
  border-color: var(--color-primary);
  border-width: 5px;
  cursor:pointer;
}
input[type="range"]::-webkit-slider-thumb:active {
  box-shadow: 0px 0px 1px var(--color-secondary);
}

#rangevalue {
  text-align: center;
  font-family: "Quantico", sans-serif;
  font-size: 18px;
  display: block;
  margin: auto;
  width: 100%;
  color: #579E81;
}
</style>
