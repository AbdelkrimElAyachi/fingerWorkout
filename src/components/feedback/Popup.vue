
<template>

  <!-- to add blur to the background-->
  <div 
    v-if="modalOpen"
    class="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
  ></div>


  <!-- Modal -->
  <dialog open class="fixed top-1/2 -translate-y-1/2  bg-backgroundColor text-textColor border-4 border-primary rounded-lg flex flex-col gap-8 w-80 p-6 z-50">
        <div class="flex justify-center items-end gap-4 text-primary">
          <h1 class="text-6xl">{{ ( result.correctWords ) / result.duration }}</h1><h1 class="text-4xl">WPM</h1> </div> 
          <hr>
        <div class="flex justify-between">
            <p>Word Accuracy </p><p> {{Math.round(( result.correctWords / (result.correctWords + result.wrongWords) ) * 100)}} %</p>
        </div>
        <div class="flex justify-between">
            <p>Character Accuracy </p><p> {{Math.round(( result.correctCharacters / (result.correctCharacters + result.wrongCharacters ) ) * 100)}} %</p>
        </div>
      <button class="bg-primary text-secondary font-bold border py-1 px-2 rounded-md hover:bg-backgroundColor hover:text-primary hover:border-primary" @click="closeModal">
            Close
      </button>
  </dialog>
</template>

<script>
export default {
  name: "Popup",
  props: {
    result: {
      type: Object,
      required: true
    }
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
    }
  }
};
</script>