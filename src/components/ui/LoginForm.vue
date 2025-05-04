<script setup>
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
</script>
<template>
    <form class="text-textColor h-fit flex flex-col gap-6 p-4 border-4 border-textColor min-w-80 rounded-lg">
        <div>
            <h5 class="text-center">Log In</h5>
            <hr class="">
        </div>
        <BaseInput
            v-model="email"
            label="Email Address :"
            type="email"
            placeholder="your@email.com"
            required
        />
        <BaseInput
            v-model="password"
            label="Password :"
            type="password"
            placeholder="******"
            :error="authError"
            required
        />

        <div class="flex flex-col gap-2 justify-center">
            <BaseButton @click="handleLogin" :disalbed="isLoading">{{isLoading ? 'Loading...' : 'Submit'}}</BaseButton>
            <div class="text-secondary">You don't have an account <span class="text-textColor font-bold"><RouterLink to="/signup">Sign Up</RouterLink></span></div>
        </div>

    </form>
</template>
<script>
import { useAuthStore } from '../../stores';
import { useRouter } from 'vue-router';


export default {
    data(){
        return {
            email:"",
            password: "",
            authError:"",
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
        'authStore.error'(newError){
            if(newError){
                this.authError = newError;
                this.authStore.clearError();
            }
        }
    },
    methods:{
        async handleLogin(){
            if(!this.email || !this.password){
                this.authError = 'Please fill in all fields'
            }
            this.isLoading = true;
            this.authError = '';

            await this.authStore.login(this.email, this.password);


            this.isLoading = false;
            this.router.push('/');
        }
    }
}

</script>