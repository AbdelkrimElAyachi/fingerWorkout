<template>
  <!-- Background blur -->
  <div 
    v-if="modalOpen"
    class="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
  ></div>

  <!-- Modal -->
  <dialog open class="fixed top-1/2 -translate-y-1/2  bg-backgroundColor text-textColor border-4 border-primary rounded-lg z-50">
    <div class="flex">
      <div class="self-center p-4">
        <Doughnut 
          :data="caculateDoghnutChartData()"
          :options="{ responsive:true }"
        />
      </div>

      <div class="flex flex-col gap-6 w-96 p-6">
        <div class="flex justify-center items-center gap-4 text-primary">
          <h1 class="text-6xl">{{ calculTestWPM }}</h1>
          <h1 class="text-4xl self-end">WPM</h1>  
          <i class="bi bi-exclamation-circle" title="WPM are calculated using the number of correct words divided by the duration of the test"></i> 
        </div> 

        <div class="flex justify-between">
          <p>Word Accuracy</p>
          <p>{{ Math.round((result.correct/ (result.correct+ result.wrong)) * 100) }} %</p>
        </div>

        <div class="flex gap-2 self-center">
          <i class="bi bi-hourglass-bottom"></i>
          <p>{{ duration }} Minute(s)</p>
        </div>

        <!-- Users leaderboard -->
        <div v-if="users?.length" class="mt-4">
          <h3 class="text-primary font-bold mb-2">Leaderboard</h3>
          <ul class="max-h-40 overflow-y-auto">
            <li 
              v-for="user in sortedUsers" 
              :key="user.id" 
              class="flex justify-between py-1 px-2 border-b border-gray-200"
            >
              <span>{{ user.id }}</span>
              <span>{{ Math.round(user.correct / this.duration) }} WPM</span>
            </li>
          </ul>
        </div>

        <button 
          class="bg-primary text-secondary font-bold border py-1 px-2 rounded-md hover:bg-backgroundColor hover:text-primary hover:border-primary mt-4"
          @click="closeModal"
        >
          Close
        </button>
      </div>
    </div>
  </dialog>
</template>

<script>
import { Chart as ChartJS } from 'chart.js/auto';
import { useAuthStore } from '@/stores';
import { Doughnut } from 'vue-chartjs';

export default {
  name: "Popup",
  props: {
    result: { type: Object, required: true },
    duration: { type: Number, required: true },
    users: { type: Array, default: () => [] } // <-- added users prop
  },
  data() {
    return {
      modalOpen: true,
      authStore: useAuthStore()
    }
  },
  computed: {
    calculTestWPM() {
      if (!this.result.correct|| !this.duration) return 0;
      return Math.round(this.result.correct / this.duration);
    },
    sortedUsers() {
      return [...this.users].sort((a, b) => (b.correct || 0) - (a.correct || 0));
    }
  },
  components: { Doughnut },
  methods: {
    closeModal() {
      this.modalOpen = false;
      this.$emit("close-results");
    },
    caculateDoghnutChartData() {
      return {
        labels: ['wrong words', 'correct words'],
        datasets: [
          {
            labels: 'Word Accuracy',
            data: [this.result.wrong, this.result.correct],
            backgroundColor: ['red', 'blue'],
            hoverOffset: 4
          }
        ]
      };
    }
  }
};
</script>

