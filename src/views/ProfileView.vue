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
                <img v-if="picture" class="rounded-full" :src="photoUrl" alt="avatar">
                <img v-else src="/assets/avatar.webp" class="rounded-full" alt="avatar">
                <h4 class="text-center mt-6">
                    {{ name|| 'User' }}
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
                <div class="flex flex-col gap-4">
                    <BaseButton v-if="editMode" @click="save" variant="primary">Save</BaseButton>
                    <BaseButton v-else @click="activateEditMode" variant="primary">Edit</BaseButton>
                    <BaseButton @click="handleLogout" variant="danger" :disalbed="isLoading">{{isLoading ? 'Logging out...' : 'Log out'}}</BaseButton>
                </div>
            </div>
        </div>
    </main> 
</template>
<script>
import { useAuthStore } from '@/stores';
import {ref} from 'vue';


export default {
    data(){
        return{
            name: null,
            email: null,
            picture: null,
            newPassword: null,
            editMode: false,
            isLoading: false,
        }
    },
    computed: {
        authStore(){
            return useAuthStore();
        }
    },
    async created(){
        if(!this.authStore.email){
            this.$router.push('/login');
        }
        this.email = this.authStore.email;
        this.name = this.authStore.name;
        this.picture = this.authStore.picture;
    },
    methods:{
        async handleLogout(){
            this.isLoading = true;
            await this.authStore.clear();
            this.isLoading = false;
            this.$router.push('/');
        },
        handlePhotoChange(event){
            this.previewImage(event);
            // handle 
            const selectedFile = event.target.files[0];
            if(selectedFile){
                this.picture = selectedFile;
            }
        },
        async uploadFile(){
        },
        activateEditMode(){
            this.editMode = true;
        },
        previewImage(event){
            const file = event.target.files[0];
            if(!file) return ;

            this.picture = URL.createObjectURL(file);
            this.$once('hook:beforeDestroy', ()=>{
                URL.revokeObjectURL(this.picture);
            })
        }
    }
}

</script>