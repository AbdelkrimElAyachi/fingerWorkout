<script setup>
import Header from '@/components/layout/Header.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
</script>

<template>
    <main class="main-container bg-backgroundColor min-h-screen text-textColor">
        <Header/>
        <div class="flex gap-16 w-10/12 mx-auto mt-12">
            <div class="w-3/12 p-6">
                <img v-if="photoUrl" class="rounded-full" :src="photoUrl" alt="avatar">
                <img v-else-if="user.photoUrl" class="rounded-full" :src="user.photoUrl" alt="avatar">
                <img v-else src="/assets/avatar.webp" class="rounded-full" alt="avatar">
                <h4 class="text-center mt-6">
                    {{ user.displayName || 'User' }}
                </h4>
            </div>
            <div class="w-7/12 flex flex-col gap-16 px-12 py-6 rounded-2xl" style="box-shadow: 1px 1px 1px 1px var(--color-text)">
                <div>
                    <h5 class="text-center">Profile Informations</h5>
                    <div class="flex justify-between mt-6">
                        <div>
                            <label for="file">Photo : </label>
                            <input type="file" name="fiel" @change="handlePhotoChange">
                        </div>
                    </div>
                </div>
                <hr>
                <BaseButton @click="handleLogout" variant="danger" :disalbed="isLoading">{{isLoading ? 'Logging out...' : 'Log out'}}</BaseButton>
            </div>
        </div>
    </main> 
</template>
<script>
import { useAuthStore } from '@/stores';
import { useRouter } from 'vue-router';

export default {
    data(){
        return{
            user: {},
            displayName: null,
            photoUrl: null,
            email: null,
            password: null,
            isLoading: false,
        }
    },
    computed: {
        authStore(){
            return useAuthStore();
        },
        router(){
            return useRouter();
        }
    },
    watch:{
        'authStore.user'(user){
            this.user = user;
        }
    },
    async created(){
        this.user = this.authStore.user;
        if(!this.user){
            this.router.push('/login');
        }
    },
    methods:{
        async handleLogout(){
            this.isLoading = true;
            await this.authStore.logout();
            this.isLoading = false;
            this.router.push('/');
        },
        handlePhotoChange(event){
            this.previewImage(event);
            // handle 
        },
        previewImage(event){
            const file = event.target.files[0];
            if(!file) return ;

            this.photoUrl = URL.createObjectURL(file);
            this.$once('hook:beforeDestroy', ()=>{
                URL.revokeObjectURL(this.photoUrl);
            })
        }
    }
}

</script>