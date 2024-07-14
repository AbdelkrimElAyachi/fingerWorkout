
<template>
  <!-- Modal -->
  <dialog open class="bg-backgroundColor text-textColor border border-primary flex flex-col gap-8 w-80 p-6 popup-result">
        <div class="flex justify-center items-end gap-4 text-primary">
          <h1 class="text-6xl">{{ ( result.correctWords ) / result.duration }}</h1><h1 class="text-4xl">WPM</h1> </div> <div class="flex justify-between">
        </div>
        <div class="flex justify-between">
            <p>Word Accuracy </p><p> {{Math.round(( result.correctWords / (result.correctWords + result.wrongWords) ) * 100)}} %</p>
        </div>
        <div class="flex justify-between">
            <p>Character Accuracy </p><p> {{Math.round(( result.correctCharacters / (result.correctCharacters + result.wrongCharacters ) ) * 100)}} %</p>
        </div>
      <button class="bg-primary border py-1 px-2 rounded-md hover:bg-backgroundColor hover:text-primary hover:border-primary" @click="closeModal">
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
  methods: {
    closeModal() {
      this.modalOpen = false; // Close the modal
      this.$emit("close-results");
    }
  }
};
</script>


<style>

.popup-result{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
}

</style>
