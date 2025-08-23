<template>
    <main class="main-container bg-backgroundColor min-h-screen text-textColor">
        <Header />

        <div class="flex flex-col md:flex-row gap-8 w-10/12 mx-auto mt-12">
          <!-- Join Room -->
          <div class="flex-1 shadow-lg rounded-lg p-8 flex flex-col items-center">
            <h2 class="text-2xl font-bold mb-6">Join a Room</h2>
            <input
              v-model="roomCode"
              type="text"
              placeholder="Enter the room code"
              class="w-full text-black border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button @click="joinRoom" class="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-primary-dark transition">
              Enter
            </button>
          </div>

          <!-- Create Room -->
          <div class="flex-1 shadow-lg rounded-lg p-8 flex flex-col items-center">
            <h2 class="text-2xl font-bold mb-6">Create a Room</h2>
            <button @click="createRoom" class="w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition">
              Create
            </button>
          </div>
        </div>


        <!-- Chat Component -->
        <Chat
          :currentUserId="currentUserId" 
          :currentUserAvatar="authStore.picture ? apiUrl+'/uploads/'+authStore.picture : '/assets/avatar.webp'"
        />
    </main> 
</template>
<script>
import { api_url } from "@/globals"; // or wherever api_url is exported
import Header from '@/components/layout/Header.vue';
import Chat from '@/components/feedback/Chat.vue'; // import the chat component
import { useSocket } from '@/composables/useSocket';
import { useAuthStore } from '@/stores/authStore'; // assuming Pinia store

export default {
    data(){
        return{
            roomCode:null,
            apiUrl: api_url,
            currentUserId : crypto.randomUUID()
        }
    },
    components:{
        Header,
        Chat
    },
    computed:{
        authStore(){
            return useAuthStore();
        }
    },
    async created(){
        if(!this.authStore.isAuthenticated){
            this.$router.push('/login');
        }
    },
    methods:{
      generateRoomCode() {
        // 6-digit random number
        return Math.floor(100000 + Math.random() * 900000).toString();
      },

      async createRoom() {
        const roomCode = this.generateRoomCode();
        const { emit } = useSocket();

        emit('createRoom', roomCode, (res) => {
          if (!res.success) {
            alert(res.error);
            return;
          }
          console.log('Room created successfully:', res.roomId);
          this.roomCode = res.roomId;
          // Automatically join the room
          this.joinRoom(roomCode);
        });
      },

      joinRoom() {
          if (!this.roomCode.trim()) {
              alert("no room code detected ")
              return;
          };

        const { emit } = useSocket();

        emit('joinRoom', this.roomCode, (res) => {
          if (!res.success) {
            alert(res.error);
            return;
          }
          console.log('Joined room:', res.roomId);
          // optionally store roomId to pass to Chat
        });
      }
  }
}

</script>
