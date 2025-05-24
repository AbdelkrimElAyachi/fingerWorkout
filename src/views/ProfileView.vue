<template>
    <main class="main-container bg-backgroundColor min-h-screen text-textColor">
        <Header/>
        <div class="flex gap-16 w-10/12 mx-auto mt-12">
            <div class="hidden">
                <input ref="pictureInput" type="file" name="file" @change="handlePictureChange">
            </div>
            <div v-if="editMode" class="w-4/12 p-6 max-h-96 relative group">
                <img v-if="picture" class="rounded-full h-full object-cover group-hover:opacity-50" :src="picture" alt="avatar">
                <img v-else-if="this.authStore.getPicture" class="rounded-full h-full object-cover group-hover:opacity-50" :src="this.authStore.getPicture" alt="avatar">
                <img v-else src="/assets/avatar.webp" class="rounded-full h-full object-cover group-hover:opacity-50" alt="avatar">
                <div
                    class="absolute inset-0 opacity-0 flex items-center justify-center group-hover:opacity-50"
                    @click="openFileInput"
                >
                    <p class="text-xl font-bold" >choose image</p>
                </div>
            </div>
            <div v-else class="w-4/12 p-6">
                <img v-if="picture" class="rounded-full h-full" :src="this.authStore.getPicture" alt="avatar">
                <img v-else src="/assets/avatar.webp" class="rounded-full" alt="avatar">
            </div>
            <div class="w-7/12 flex flex-col gap-16 px-12 py-6 rounded-2xl" style="box-shadow: 1px 1px 1px 1px var(--color-text)">
                <div v-if="editMode" class="grid grid-cols-[1fr] gap-6 mt-12 text-xl font-bold">
                    <BaseInput 
                        v-model="name"
                        label=""
                        type="text"
                        placeholder="your name"
                        :error="nameError"
                        required 
                    />
                    <BaseInput 
                        v-model="email"
                        label=""
                        type="email"
                        placeholder="your@gmail.com"
                        :error="emailError"
                        required 
                    />
                </div>
                <div v-else>
                    <h5 class="text-center">Profile Informations</h5>
                    <div class="grid grid-cols-[150px_300px] gap-6 mt-12 text-xl font-bold">
                        <div>Username : </div>
                        <div>{{ this.name }}</div>
                        <div>Email : </div>
                        <div>{{ this.email }}</div>
                    </div>
                </div>
                <hr>
                <div class="flex flex-col gap-4">
                    <BaseButton v-if="editMode" @click="save" variant="primary">Save</BaseButton>
                    <BaseButton v-if="editMode" @click="annuler" variant="danger">Annuler</BaseButton>
                    <BaseButton v-if="!editMode" @click="activateEditMode" variant="primary">Edit</BaseButton>
                    <BaseButton v-if="!editMode" @click="handleLogout" variant="danger" :disalbed="isLoading">{{isLoading ? 'Logging out...' : 'Log out'}}</BaseButton>
                </div>
            </div>
        </div>
    </main> 
</template>
<script>
import Header from '@/components/layout/Header.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { useAuthStore } from '@/stores';


export default {
    data(){
        return{
            name: null,
            email: null,
            picture: null,
            newPassword: null,
            editMode: true,
            isLoading: false,
        }
    },
    components:{
        BaseButton,
        BaseInput,
        Header,
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
        this.email = this.authStore.email;
        this.name = this.authStore.name;
        this.picture = this.authStore.picture;
    },
    methods:{
        // logout logic
        async handleLogout(){
            this.isLoading = true;
            await this.authStore.clear();
            this.isLoading = false;
            this.$router.push('/');
        },
        // Picture login
        openFileInput(){
            this.$refs.pictureInput.click();
        },
        handlePictureChange(event){
            this.previewImage(event);
            // handle uploading image
        },
        async uploadFile(){
        },
        previewImage(event){
            const file = event.target.files[0];
            if(!file) return ;
            this.picture = URL.createObjectURL(file);
            console.log(this.picture);
        },
        // state handling
        activateEditMode(){
            this.editMode = true;
        },
        save(){
            console.log("save was clicked");
        },
        annuler(){
            console.log("annuler was clicked");
        },
        onUnmounted(){
            URL.revokeObjectURL(this.picture);
        }
        
    }
}

</script>