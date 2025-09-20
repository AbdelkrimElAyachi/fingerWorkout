<template>
  <div v-if="users.length" class="flex gap-4 overflow-x-auto py-2">
    <UserAvatar v-for="user in users" :key="user.id" :user="user" :apiUrl="apiUrl" />
  </div>
  <p v-else class="text-gray-400 text-center mt-2">No other users connected yet.</p>
</template>

<script>
import UserAvatar from './UserAvatar.vue';
export default {
  props: {
    users: Array,
    apiUrl: String
  },
  components: { UserAvatar }
}
</script>

