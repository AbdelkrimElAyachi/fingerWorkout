<template>
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-white-800">
      Room <span class="text-primary">{{ roomCode }}</span>
    </h1>
    <p>Room will be deleted in: {{ ttl }}s</p>
    <button 
      @click="$emit('leaveRoom')" 
      class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition"
    >Exit</button>
  </div>
</template>

<script>
export default {
  props: {
    roomCode: String,
    ttl: Number
  }
}
</script>
