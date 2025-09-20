<template>
  <div class="flex flex-col items-center" :title="user.id">
    <div class="relative w-14 h-14 rounded-full p-1 bg-gradient-to-tr from-purple-500 via-pink-500 to-red-400">
      <img 
        :src="user.avatar ? apiUrl+'/uploads/'+user.avatar : '/assets/avatar.webp'" 
        alt="avatar" 
        class="w-full h-full rounded-full border-2 border-white object-cover" 
      />
      <span 
        :class="['absolute bottom-0 right-0 w-4 h-4 border-2 border-white rounded-full', user.isReady ? 'bg-green-500' : 'bg-gray-500']"
        title="Ready"
      ></span>
    </div>
    <span class="text-xs mt-1 text-gray-600 font-medium">{{ user.id.slice(0,5) }}...</span>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    apiUrl: String
  }
}
</script>
