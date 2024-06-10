
<template>
  <!-- Modal -->
  <dialog open class="bg-backgroundColor text-textColor border border-primary p-6 min-w-72 flex flex-col items-center gap-4 absolute top-0 left-0 mt-64 ml-94">
        <div class="flex justify-between w-full">
            <p>Wrong Characters</p><p> {{ result.wrongCharacters }}</p>
        </div>
        <div class="flex justify-between w-full">
            <p>Wrong Words</p><p> {{ result.wrongWords }}</p>
        </div>
        <div class="flex justify-between w-full">
            <p>Correct Characters</p><p> {{ result.correctCharacters }}</p>
        </div>
        <div class="flex justify-between w-full">
            <p>Correct Words</p><p> {{ result.correctWords }}</p>
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
