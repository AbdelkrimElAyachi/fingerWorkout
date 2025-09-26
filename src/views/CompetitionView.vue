<template>
  <main class="main-container bg-backgroundColor min-h-screen text-textColor">
    <Header />

    <div v-if="gameState=='started'" class="w-5/6 mx-auto p-10">
        <RaceLine :users="roomUsers" :apiUrl="apiUrl" :totalWords="words.length" :ttl="ttl"/>
        <Game :words="words" :index="user.index" :duration="1.5" :user="user" :users="roomUsers" />
    </div>

    <div v-if="gameState=='finished'">
        <GamePopup :result="user" :users="roomUsers" :duration="1.5" @close-results="onGamePopupClose"/>
    </div>

    <template v-if="gameState=='idle'">
        <div v-if="roomJoined" class="w-5/6 mx-auto p-10">
          <RoomHeader :roomCode="roomCode" :ttl="ttl" @leaveRoom="leaveRoom" />
          <RoomUsers :users="roomUsers" :apiUrl="apiUrl" />
          <ReadyButton :user="user" @markReady="markReady" />
        </div>

        <div v-else>
          <JoinCreateRoom v-model:roomCode="roomCode" :joinRoom="joinRoom" :createRoom="createRoom" />
        </div>
    </template>

    <Chat :currentUserId="user.id" :currentUserAvatar="authStore.picture ? apiUrl+'/uploads/'+authStore.picture : '/assets/avatar.webp'" />
  </main>
</template>
<script>
import { connectSocket, emit, registerEvents, unregisterEvents } from '@/services/socketService';
import { useAuthStore } from '@/stores/authStore';
import { api_url } from '@/globals';
import Header from '@/components/layout/Header.vue';
import Chat from '@/components/feedback/Chat.vue';
import JoinCreateRoom from '@/components/feedback/JoinCreateRoom.vue';
import RoomHeader from '@/components/feedback/RoomHeader.vue';
import RoomUsers from '@/components/feedback/RoomUsers.vue';
import ReadyButton from '@/components/feedback/ReadyButton.vue';
import UserAvatar from '@/components/feedback/UserAvatar.vue';
import Game from '@/components/typing/Game.vue';
import RaceLine from '@/components/typing/RaceLine.vue';
import GamePopup from '@/components/feedback/GamePopup.vue';

export default {
  data() {
    return {
      apiUrl: api_url,
      gameState : "idle",
      roomJoined: false,
      roomCode: null,
      roomUsers: [],
      words: [],
      ttl: null,
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
    Chat,
    JoinCreateRoom,
    RoomUsers,
    RoomHeader,
    ReadyButton,
    UserAvatar,
    Game,
    RaceLine,
    GamePopup
  },
  computed: {
    authStore() {
      return useAuthStore();
    }
  },

  watch: {
    gameState(newVal) {
        if (newVal === 'started') {
          // Only set if it doesn't already exist
          if (!localStorage.getItem('gameStartTimestamp')) {
            const now = Date.now();
            localStorage.setItem('gameStartTimestamp', now.toString());
          }
        } else {
          localStorage.removeItem('gameStartTimestamp');
        }
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

      roomUsersUpdate: this.RoomUsersUpdateHandler,
      userJoined: this.UserJoinedHandler,
      userLeft: this.UserLeftHandler,
      gameStateUpdate: ({roomId, state, words}) => {
        this.gameState = state;
        if(this.words){
            this.words = words.split('|');
        }
      }
    });
    // handle existing room code
    this.getRoomIdIfExisted();
    this.getGameState();
    setTimeout(()=>{
        this.loadAlreadyExistingUsers();
    }, 1000);

  },
  beforeUnmount() {
    // Clean up the listener when component unmounts
    unregisterEvents(['roomUsersUpdate']);
  },
  methods: {
        RoomUsersUpdateHandler(data){
            if (data.roomId !== this.roomCode) {
              return;
            }

            data.users.forEach(updatedUser => {
              const index = this.roomUsers.findIndex(u => u.id === updatedUser.id);
              if (index !== -1) {
                this.roomUsers[index] = { ...this.roomUsers[index], ...updatedUser };
              }
              // 🔑 Also update local `this.user` if it's me
              if (updatedUser.id === this.user.id) {
                this.user = { ...this.user, ...updatedUser };
              }
            });
        },

        onGamePopupClose() {
            this.gameState = 'idle';
        },

        UserJoinedHandler({ userId, avatar }){
          this.roomUsers.push({id:userId, index:0, wrong:0, correct:0, avatar, isReady: false})
        },

        UserLeftHandler({ userId }){
            // remove the user who left
            this.roomUsers = this.roomUsers.filter(u => u.id !== userId);
        },

        loadAlreadyExistingUsers(){
            if(!this.roomCode){
                return;
            }
            emit('getRoomUsers', this.roomCode, (data) => {
                if(data.roomId === this.roomCode){
                    this.roomUsers = data.users;

                  // update local user progress
                  const me = this.roomUsers.find(u => u.id === this.user.id);
                  if (me) {
                    this.user = { ...this.user, ...me };
                  }
                  console.log(this.user.index);
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

        getGameState(){
            emit("checkGameState", this.roomCode, (res) => {
              if (!res.success) {
                console.error(res.error);
                return;
              }
              
            console.log(res.state);
            this.gameState = res.state;
            this.words = res.words.split('|');

            });
        },

        setTtlInterval(){
          if (this.ttlInterval) {
            clearInterval(this.ttlInterval); // prevent duplicates
          }

          this.ttlInterval = setInterval(() => {
              this.ttl = this.ttl - 1;
              if(this.ttl<=0){
                clearInterval(this.ttlInterval);
                alert("the room duration is finished the room will be deleted now and the all the users kicked out");
                this.gameState = "idle";
                this.leaveRoom();
              }
          }, 1000);
        },

    generateRoomCode() {
      return Math.floor(100000 + Math.random() * 900000).toString();
    },

    markReady(){
        if (!this.roomJoined) return;
        // remove the previous game start timer
        localStorage.removeItem('gameStartTimestamp');

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
        this.roomCode = null;
      });
    }
  }
};
</script>
