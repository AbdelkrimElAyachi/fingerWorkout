<template>
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-white-800">
      Room <span class="text-primary">{{ roomCode }}</span>
    </h1>

    <p 
      :class="[
        'font-medium relative',
        ttl <= 10 ? 'text-red-500 font-extrabold' : 'text-gray-300'
      ]"
    >
      Room will be deleted in: 
      <span 
        :key="ttl" 
        :class="ttl <= 10 ? 'animate-pop' : ''"
        class="inline-block"
      >
        {{ ttl }}s
      </span>
    </p>

    <button 
      @click="$emit('leaveRoom')" 
      class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition"
    >
      Exit
    </button>
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

<style>
@keyframes pop {
  0% { transform: scale(1); opacity: 1; }
  30% { transform: scale(1.6); opacity: 1; }
  70% { transform: scale(0.9); opacity: 0.7; }
  100% { transform: scale(1); opacity: 0; }
}

.animate-pop {
  animation: pop 1s ease forwards;
}
</style>

