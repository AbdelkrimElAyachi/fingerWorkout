<template>

  <!-- to add blur to the background-->
  <div 
    v-if="modalOpen"
    class="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
  ></div>

  <!-- Modal -->
  <dialog open class="fixed top-1/2 -translate-y-1/2  bg-backgroundColor text-textColor border-4 border-primary rounded-lg flex flex-col gap-8 w-80 p-6 z-50">
        <div class="flex justify-center items-center gap-4 text-primary">
          <h1 class="text-6xl">{{ Math.round(( result.correctWords ) / result.duration) }}</h1>
          <h1 class="text-4xl self-end">WPM</h1>  
          <i class="bi bi-exclamation-circle" title="WPM are calculated using the number of correct words divided by the duration of the test"></i> 
        </div> 
        <div class="h-40 self-center">
            <Doughnut 
            :data="caculateDoghnutChartData()"
            :options="{
              responsive:true,
              plugins:{
                legend:{
                  display:false,
                },
                title:{
                  display:false,
                }
              }
            }"
            />
        </div>
        <div class="flex justify-between">
            <p>Word Accuracy </p><p> {{Math.round(( result.correctWords / (result.correctWords + result.wrongWords) ) * 100)}} %</p>
        </div>
        <div class="flex justify-between">
            <p>Character Accuracy </p><p> {{Math.round(( result.correctCharacters / (result.correctCharacters + result.wrongCharacters ) ) * 100)}} %</p>
        </div>
        <div class="flex gap-2 self-center">
          <i class="bi bi-hourglass-bottom"></i>
          <p>{{ result.duration }} Minute(s)</p>
        </div>
      <button class="bg-primary text-secondary font-bold border py-1 px-2 rounded-md hover:bg-backgroundColor hover:text-primary hover:border-primary" @click="closeModal">
            Close
      </button>
  </dialog>
</template>

<script>
import {Chart as ChartJS} from 'chart.js/auto';
import { Doughnut } from 'vue-chartjs';

export default {
  name: "Popup",
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  components:{
    Doughnut
  },
  data(){
    return{
      modalOpen : true,
    }
  },
  methods: {
    closeModal() {
      this.modalOpen = false; // Close the modal
      this.$emit("close-results");
    },
    caculateDoghnutChartData(){
      return{
        labels: [
          'number of wrong word',
          'correct words'
        ],
        datasets:[
          {
            labels: 'Word Accuracy',
            data: [this.result.wrongWords, this.result.correctWords],
            backgroundColor: [
              'red',
              'blue'
            ],
            hoverOffset: 4
          }
        ]
      }
    }
  }
};
</script>