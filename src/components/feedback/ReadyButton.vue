<template>
  <div v-if="!user.isReady" class="flex justify-center items-center mb-4 w-full">
    <button 
      @click="$emit('markReady')" 
      class="px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full shadow-md transition"
    >I'm Ready</button>
  </div>
</template>

<script>
export default {
  props: { user: Object }
}
</script>
