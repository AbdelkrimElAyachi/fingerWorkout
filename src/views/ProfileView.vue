<template>
    <main class="main-container bg-backgroundColor min-h-screen text-textColor">
        <Header />
        <div class="flex gap-16 w-10/12 mx-auto mt-12">
            <div class="hidden">
                <input ref="pictureInput" type="file" name="file" @change="handlePictureChange">
            </div>
            <div v-if="editMode" class="w-4/12 p-6 max-h-96 relative group">
                <img v-if="editedPicture" class="rounded-full h-full object-cover group-hover:opacity-50" :src="picture" alt="avatar">
                <img v-else-if="picture" class="rounded-full h-full object-cover group-hover:opacity-50" :src="apiUrl+'/uploads/'+picture" alt="avatar">
                <img v-else src="/assets/avatar.webp" class="rounded-full h-full object-cover group-hover:opacity-50" alt="avatar">
                <div
                    class="absolute inset-0 opacity-0 flex items-center justify-center group-hover:opacity-50"
                    @click="openFileInput"
                >
                    <p class="text-xl font-bold" >choose image</p>
                </div>
            </div>
            <div v-else class="w-4/12 p-6 mx-auto mt-12 max-h-96">
                <img v-if="picture" class="rounded-full h-full object-cover" :src="apiUrl+'/uploads/'+picture" alt="avatar">
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
                    <div class="flex items-center">
                        <input for="includePassword" id="incluePassword" name="includePassword" v-model="includePassword" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="includePassword" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Update Password</label>
                    </div>
                    <BaseInput 
                        v-if="includePassword"
                        v-model="newPassword"
                        label=""
                        type="password"
                        placeholder="******"
                        :error="newPasswordError"
                        required 
                    />
                    <BaseInput 
                        v-if="includePassword"
                        v-model="verifyNewPassword"
                        label=""
                        type="password"
                        placeholder="******"
                        :error="newPasswordError"
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
                    <BaseButton v-if="editMode" @click="save" variant="primary">{{ isLoading ? "Loading..." : "Save" }}</BaseButton>
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
import BaseInput from '@/components/base/BaseInput.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { useAuthStore } from '@/stores';
import { updateProfile } from '@/utils/auth';
import { api_url } from "@/globals";

export default {
    data(){
        return{
            name: null,
            nameError:null,
            email: null,
            emailError: null,
            picture: null,
            pictureData: null,
            pictureError: null,
            editedPicture: false,
            newPassword: null,
            verifyNewPassword: null,
            newPasswordError: null,
            editMode: false,
            includePassword: false,
            isLoading: false,
            apiUrl: api_url,
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
            this.pictureData = event.target.files[0];
        },
        async uploadFile(){
        },
        previewImage(event){
            const file = event.target.files[0];
            if(!file) return ;
            this.editedPicture = true;
            this.picture = URL.createObjectURL(file);
        },
        // state handling
        activateEditMode(){
            this.editMode = true;
            this.nameError = "";
            this.emailError = "";
            this.newPasswordError = "";
        },
        async save(){
            let isValid = true;
            let res = null;

            if(!this.name){
                this.nameError = "The field name is required";
                isValid = false;
            }
            if(!this.email){
                this.emailError = "The field email is required";
                isValid = false;
            }
            if(this.includePassword && !this.newPassword){
                this.newPasswordError = "The field password is required";
                isValid = false;
            }
            if(this.includePassword && this.newPassword != this.verifyNewPassword){
                this.newPasswordError = "The password does not match";
                isValid = false;
            }
            if(!isValid){
                return;
            }
            let formData = new FormData();

            formData.append('name',this.name);
            formData.append('email',this.email);
            if(this.includePassword){
                formData.append('password',this.newPassword);
            }
            formData.append('picture',this.pictureData);

            this.isLoading = true;
            try{
                res = await updateProfile(formData);
                console.log(res);
            }
            catch(error){
                this.newPasswordError = "Sorry an unexpecated error happened, try again later"
                this.isLoading = false;
                return;
            }
            if(!res?.success){
                if(res.errors.validationErrors){
                    this.nameError = res.errors.validationErrors['name'];
                    this.emailError = res.errors.validationErrors['email'];
                    this.newPasswordError = res.errors.validationErrors['password'];
                }
                else{
                    this.emailError = res.errors.authError;
                }
                this.isLoading = false;
                return ;
            }

            this.authStore.setUser(res.user, false);
            this.isLoading = false;
            this.editMode = false;
            this.editedPicture = false;
            this.picture = this.authStore.picture;
        },
        annuler(){
            this.name = this.authStore.name;
            this.email = this.authStore.email;
            this.picture = this.authStore.picture;
            this.editMode = false;
            this.editedPicture = false;
        },
        onUnmounted(){
            URL.revokeObjectURL(this.picture);
        }
        
    }
}

</script>