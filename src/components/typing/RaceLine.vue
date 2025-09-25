<template>
  <div class="relative w-full max-w-4xl mx-auto h-16 bg-BackgroundColor rounded-lg shadow-md overflow-hidden">
    <!-- Track -->
    <div class="absolute top-1/2 left-0 w-full h-2 bg-primary -translate-y-1/2 rounded"></div>

    <!-- Finish line -->
    <div class="absolute top-0 right-0 w-1 h-full bg-white"></div>

    <!-- Users -->
    <div
      v-for="user in users"
      :key="user.id"
      class="absolute flex flex-col items-center transition-all duration-300"
      :style="{ left: getUserPosition(user) + '%' }"
    >
      <img
        :src="user.avatar ? apiUrl+'/uploads/'+user.avatar : '/assets/avatar.webp'" 
        class="w-10 h-10 rounded-full border-2 border-white shadow-md"
        :alt="user.id"
      />
      <span class="text-xs mt-1 text-gray-700 font-medium truncate w-16 text-center">
        {{ user.id }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true
    },
    totalWords: {
      type: Number,
      required: true
    },
    apiUrl: String
  },
  computed: {
    leaderIndex() {
      return Math.max(...this.users.map(u => u.index || 0));
    }
  },
  methods: {
    getUserPosition(user) {
      if (!this.totalWords || this.totalWords <= 0) return 0;

      const progress = (user.correct / this.totalWords) * 100;
      return Math.min(progress, 100);
    }
  }
};
</script>

