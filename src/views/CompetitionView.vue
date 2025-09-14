<template>
    <main class="main-container bg-backgroundColor min-h-screen text-textColor">
        <Header />

         <div v-if="roomJoined" class="w-5/6 mx-auto p-10">
              <!-- Room header -->
            <div class="flex justify-between items-center mb-4">
              <h1 class="text-2xl font-bold text-white-800">Room <span class="text-primary">{{ roomCode }}</span></h1>
              <p>room will be deleted in : {{ ttl }}s</p>
              <button 
                @click="leaveRoom" 
                class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition"
              >
                Exit
              </button>
            </div>

            <!-- Connected users -->
            <div v-if="roomUsers.length" class="flex gap-4 overflow-x-auto py-2">
              <div v-for="user in roomUsers" :key="user.id" class="flex flex-col items-center" :title="user.id">
                <div class="relative w-14 h-14 rounded-full p-1 bg-gradient-to-tr from-purple-500 via-pink-500 to-red-400">
                  <img 
                    v-if="user.avatar" 
                    :src="apiUrl+'/uploads/'+user.avatar" 
                    alt="avatar" 
                    class="w-full h-full rounded-full border-2 border-white object-cover" 
                  />
                  <img 
                    v-else 
                    src="/assets/avatar.webp" 
                    alt="avatar" 
                    class="w-full h-full rounded-full border-2 border-white object-cover" 
                  />

                  <!-- Ready indicator -->
                  <span 
                    v-if="user.isReady" 
                    class="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
                    title="Ready"
                  ></span>
                  <span 
                    v-else="user.isReady" 
                    class="absolute bottom-0 right-0 w-4 h-4 bg-gray-500 border-2 border-white rounded-full"
                    title="Ready"
                  ></span>
                </div>
                <span class="text-xs mt-1 text-gray-600 font-medium">{{ user.id.slice(0, 5) }}...</span>
              </div>
            </div>

            <p v-else class="text-gray-400 text-center mt-2">No other users connected yet.</p>


            <div v-if="!this.user.isReady" class="flex justify-center items-center mb-4 w-full">
              <button 
                @click="markReady" 
                class="px-4 py-2 bg-primary hover:bg-secondary text-white rounded-full shadow-md transition"
              >
                  i'm ready
              </button>
            </div>
        </div>

        <div v-else class="flex flex-col md:flex-row gap-8 w-10/12 mx-auto mt-12">
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
            <button @click="createRoom" class="w-full bg-primary text-white font-semibold py-2 rounded-md hover:bg-green-600 transition">
              Create
            </button>
          </div>
        </div>


        <!-- Chat Component -->
        <Chat
          :currentUserId="this.user.id" 
          :currentUserAvatar="authStore.picture ? apiUrl+'/uploads/'+authStore.picture : '/assets/avatar.webp'"
        />
    </main> 
</template>
<script>
import Header from '@/components/layout/Header.vue';
import Chat from '@/components/feedback/Chat.vue';
import { connectSocket, emit, registerEvents, unregisterEvents } from '@/services/socketService';
import { useAuthStore } from '@/stores/authStore';
import { api_url } from '@/globals';

export default {
  data() {
    return {
      roomCode: null,
      roomJoined: false,
      ttl: null,
      apiUrl: api_url,
      roomUsers : [],
      user: {
          isReady: false,
          index: 0,
          correct: 0,
          wrong: 0,
          id: null,
          avatar: null 
      }
    };
  },
  components: {
    Header,
    Chat
  },
  computed: {
    authStore() {
      return useAuthStore();
    }
  },
  created() {
    if (!this.authStore.isAuthenticated) {
      this.$router.push('/login');
    }
  },
  mounted() {
    // get user data
    this.user.id = this.authStore.email;
    this.user.avatar = this.authStore.picture;

    // Connect global socket once
    connectSocket(this.user.id);

    // Register roomUsersUpdate event
    registerEvents({
      roomUsersUpdate: (data) => {
          if (data.roomId !== this.roomCode) {
              return;
          }
          console.log(data.users);
          data.users.forEach(updatedUser => {
            const index = this.roomUsers.findIndex(u => u.id === updatedUser.id);
            console.log(index);
            if (index !== -1) {
              // Only update the matching user
              this.roomUsers[index] = { ...this.roomUsers[index], ...updatedUser };
            }
          });
      }
    });
    // handle existing room code
    this.getRoomIdIfExisted();
    setTimeout(()=>{
        this.loadAlreadyExistingUsers();
    }, 1000);
  },
  beforeUnmount() {
    // Clean up the listener when component unmounts
    unregisterEvents(['roomUsersUpdate']);
  },
  methods: {
    loadAlreadyExistingUsers(){
        if(!this.roomCode){
            return;
        }
        emit('getRoomUsers', this.roomCode, (data) => {
            if(data.roomId = this.roomCode){
                console.log(data.users);
                this.roomUsers = data.users;
            }
        })
    },
    getRoomIdIfExisted(){
        const roomCode = localStorage.getItem('room');
        if(!roomCode){
            return false;
        }
        emit('checkRoom', roomCode, (res) => {
            if(!res.success || !res.exists){
                this.roomCode = null;
                this.roomJoined = false;
                localStorage.removeItem('room');
                return ;
            }
            this.roomCode = roomCode;
            this.roomJoined = true;
            this.ttl = res.ttl;
            this.setTtlInterval();
        })
    },

    setTtlInterval(){
      setInterval(() => {
          this.ttl = this.ttl - 1;
      }, 1000);
    },

    generateRoomCode() {
      return Math.floor(100000 + Math.random() * 900000).toString();
    },

    markReady(){
        if (!this.roomJoined) return;

        // emit the 'userReady' event to the server
        emit('userReady', null, (res) => {
          if (!res.success) {
            console.error('Failed to mark as ready:', res.error);
            return;
          }
          console.log('You are now ready!');
          this.user.isReady = true;
        });
    },

    createRoom() {
      const roomCode = this.generateRoomCode();

      emit('createRoom', roomCode, (res) => {
        if (!res.success) {
          alert(res.error);
          return;
        }
        console.log('Room created successfully:', res.roomId);
        this.roomCode = res.roomId;

        // Automatically join the room
        this.joinRoom();
      });
    },

    joinRoom(){
      const roomId =  this.roomCode;

      if (!roomId?.trim()) {
        alert("No room code detected");
        return;
      }
      const payload = {roomId, avatar: this.user.avatar};

      emit('joinRoom', payload, (res) => {
        if (!res.success) {
          alert(res.error);
          return;
        }
        console.log('Joined room:', res.roomId);
        localStorage.setItem('room', this.roomCode)
        this.roomJoined = true;
        this.ttl = res.ttl;
      });

      setTimeout(()=>{
          this.loadAlreadyExistingUsers();
      }, 1000);

      this.setTtlInterval();
    },
    
    leaveRoom(){
      emit('leaveRoom', null, (res) => {
        if (!res.success) {
          alert(res.error);
          return;
        }
        console.log('leaving room:', res.roomId);
        localStorage.removeItem('room');
        this.roomJoined = false;
      });
    }
  }
};
</script>
