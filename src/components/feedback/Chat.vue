<template>
  <div>
    <!-- Chat Toggle Button -->
    <button
      @click="toggleChat"
      class="fixed right-4 bottom-4 z-50 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-primary-dark transition"
    >
      💬
    </button>

    <!-- Chat Panel -->
    <transition name="slide">
      <div
        v-if="isOpen"
        class="chat-container fixed right-0 top-0 h-full w-80 bg-white shadow-xl flex flex-col z-40"
      >
        <!-- Header -->
        <div class="chat-header flex justify-between items-center p-4 border-b border-gray-200">
          <h3 class="text-lg font-bold">Chat</h3>
          <button @click="toggleChat" class="text-gray-500 hover:text-gray-700">✖</button>
        </div>

        <!-- Messages -->
        <div class="chat-messages flex-1 p-4 overflow-y-auto space-y-3" ref="messagesContainer">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="['flex items-start gap-2', { 'justify-end': msg.senderId === currentUserId }]"
          >
            <p v-if="msg.senderId == 'system'" class="text-xs w-full text-center text-gray-500 italic">
            {{ msg.message }}
            </p>
            <template v-else>
                <img
                  v-if="msg.senderId !== currentUserId"
                  class="w-8 h-8 rounded-full"
                  :src="msg.avatar"
                  alt="user avatar"
                />
                <div
                  :class="['px-3 py-2 rounded-xl max-w-xs break-words', 
                            msg.senderId === currentUserId ? 'bg-primary text-white self-end' : 'bg-gray-200 text-gray-800']"
                >
                  {{ msg.message }}
                </div>
            </template>
          </div>
        </div>

        <!-- Input -->
        <div class="chat-input p-4 border-t border-gray-200 flex gap-2">
          <button
            @click="sendMessageHandler"
            class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
          >
            Send
          </button>
          <input
            v-model="newMessage"
            @keyup.enter="sendMessageHandler"
            type="text"
            placeholder="Type a message..."
            class="flex-1 w-4/12 border border-gray-300 rounded text-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </transition>
  </div>
</template>


<script setup>
import { useAuthStore } from '@/stores/authStore';
import { ref, nextTick, onMounted, onUnmounted, toRefs } from 'vue';
import {
  connectSocket,
  emit,
  registerEvents,
  unregisterEvents
} from '@/services/socketService';

const messages = ref([]);
const newMessage = ref('');
const messagesContainer = ref(null);
const isOpen = ref(false);

const props = defineProps({
  currentUserId: String,
  currentUserAvatar: String
});

const { currentUserId, currentUserAvatar } = toRefs(props);

const toggleChat = () => {
  isOpen.value = !isOpen.value;
};

const scrollToBottom = () => {
  nextTick(() => {
    const container = messagesContainer.value;
    if (container) container.scrollTop = container.scrollHeight;
  });
};

// --- Socket Events ---
onMounted(() => {
  const authStore = useAuthStore();
  connectSocket(authStore.email); // connect global socket

  // register only chat-specific events
  registerEvents({
    receiveMessage: (msg) => {
      messages.value.push({
        message: msg.message,
        senderId: msg.userId,
        avatar: msg.avatar
      });
      scrollToBottom();
    },
    userJoined: ({ userId }) => {
      messages.value.push({ message: `User ${userId} joined the room`, senderId: 'system', avatar: '' });
      scrollToBottom();
    },
    userLeft: ({ userId }) => {
      messages.value.push({ message: `User ${userId} left the room`, senderId: 'system', avatar: '' });
      scrollToBottom();
    },
    userReconnected: ({ userId }) => {
      messages.value.push({ message: `User ${userId} reconnected`, senderId: 'system', avatar: '' });
      scrollToBottom();
    }
  });
});

onUnmounted(() => {
  // cleanup chat-specific events (global events like connect/disconnect stay)
  unregisterEvents(['receiveMessage', 'userJoined', 'userLeft', 'userReconnected']);
});

// --- Send Message ---
const sendMessageHandler = () => {
  if (newMessage.value.trim() === '') return;

  emit('sendMessage', {
    message: newMessage.value,
    senderId: currentUserId.value,
    avatar: currentUserAvatar.value
  });

  // Show own message immediately
  messages.value.push({
    message: newMessage.value,
    senderId: currentUserId.value,
    avatar: currentUserAvatar.value
  });

  newMessage.value = '';
};
</script>

<style scoped>
/* Simple slide transition */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}
</style>

