<template>
  <div class="flex flex-col md:flex-row gap-8 w-10/12 mx-auto mt-12">
    <div v-for="form in forms" :key="form.title" class="flex-1 shadow-lg rounded-lg p-8 flex flex-col items-center">
      <h2 class="text-2xl font-bold mb-6">{{ form.title }}</h2>

      <template v-if="form.type === 'input'">
        <input
          :value="roomCode"
          @input="$emit('update:roomCode', $event.target.value)"
          type="text"
          :placeholder="form.placeholder"
          class="w-full text-black border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button @click="form.action()" class="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-primary-dark transition">
          {{ form.buttonText }}
        </button>
      </template>

      <template v-else>
        <button @click="form.action()" class="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-green-600 transition">
          {{ form.buttonText }}
        </button>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    roomCode: String, // prop is now read-only
    joinRoom: Function,
    createRoom: Function
  },
  computed: {
    forms() {
      return [
        { title: 'Join a Room', type: 'input', placeholder: 'Enter the room code', action: this.joinRoom, buttonText: 'Enter' },
        { title: 'Create a Room', type: 'button', action: this.createRoom, buttonText: 'Create' }
      ];
    }
  }
}
</script>

