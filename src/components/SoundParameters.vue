<script setup>
</script>
<template>
    <div class="">
        <div class="container">
          <div>
            <select class="select" v-model="sound" >
                    <option v-for="choice in choices" :key="choice" :value="choice"  > {{ choice }} </option>
            </select>
          </div>
          <div class="slider">
          <input v-model="soundLevel" type="range" min="0" max="100" />
          <output id="rangevalue">{{ soundLevel }}</output>
          </div>
        </div>
        <div class="triangle" />
    </div>
</template>

<script>
import { useSoundStore } from "../store.js";
import { soundEnum } from "../globals.js";

export default {
    name: "SoundParameters",
    data(){
        return {
            soundLevel:0,
            sound:"/assets/sounds/something",
            choices: [],
        }
    },
    created(){
        this.soundLevel = useSoundStore.getSoundLevel;
        this.sound = useSoundStore.getSound;
        this.choices = soundEnum;
    },
    watch: {
        soundLevel(newV,oldV){
            useSoundStore.setSoundLevel(newV);
        },
        sound(newV,oldV){
            useSoundStore.setSound(newV);
        }
    },
    components: {
        save(){
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
    left:15px;
    bottom:65px;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-top: 25px solid var(--color-primary);
    animation-name: triangle;
    animation-duration: 0.6s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}
@keyframes triangle{
    from  {bottom:65px;}
    to {bottom:50px;}
}
.container{
    border: solid var(--color-primary) 3px;
    position:absolute;
    width:200px;
    padding:10px;
    left:15px;
    bottom:100px;
    text-align:center;
    background:var(--color-black);
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
