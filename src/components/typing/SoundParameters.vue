<script setup>
</script>
<template>
    <div >
        <div class="container" style="left:15px">
          <div>
            <select class="select" v-model="sound" >
              <option v-for="choice in choices" :key="choice" :value="choice"  > {{ choice }} </option>
            </select>
          </div>
          <div class="slider soundParameter">
            <input v-model="soundLevel" type="range" min="0" max="100" />
            <output id="rangevalue">{{ soundLevel }}</output>
          </div>
        </div>
        <div class="triangle" style="left:15px;bottom: 65px;" />
    </div>
</template>

<script>
import { useSoundStore } from "@/stores";
import { sounds } from "@/globals.js";

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
        const store = useSoundStore()
        this.soundLevel = store.getSoundLevel;
        this.sound = store.getSound;
        this.choices = sounds;
    },
    watch: {
        soundLevel(newV,oldV){
            useSoundStore().setSoundLevel(newV);
        },
        sound(newV,oldV){
            useSoundStore().setSound(newV);
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
  text-align: center;
}
.triangle{
    position:absolute;
    width: 0;
    height: 0;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-top: 25px solid var(--color-text);
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
    border: solid var(--color-text) 3px;
    border-radius: 10px 10px 10px 0;
    position:absolute;
    width:200px;
    bottom:100px;
    text-align:center;
}

.slider {
  width: 100%;
  margin: 1rem auto;
}

input[type="range"] {
  cursor: pointer;
  -webkit-appearance: none !important;
  width: 100%;
  height: 15px;
  background-color: transparent;
  border: 2px solid var(--color-white);
  border-radius: 10px;
  margin: auto;
  transition: all 0.3s ease;
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
