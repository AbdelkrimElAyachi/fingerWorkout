<script setup>
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import { RouterLink } from 'vue-router';

</script>
<template>
    <form class="text-textColor h-fit flex flex-col gap-6 p-4 border-4 border-textColor min-w-80">
        <div>
            <h5 class="text-center">Sign Up</h5>
            <div class="w-full h-1 bg-textColor"></div>
        </div>
        <BaseInput
            v-model="email"
            label="Email Address :"
            type="email"
            placeholder="your@email.com"
            :error="emailError"
            required
        />
        <BaseInput
            v-model="password"
            label="Password :"
            type="password"
            :error="passwordError"
            required
        />

        <div class="flex flex-col gap-2 justify-center">
            <BaseButton @click="handleSignup" :disabled="isLoading">{{ isLoading ? 'Loading...' : 'submit' }}</BaseButton>
            <div class="text-secondary">You already have an account <span><RouterLink class="text-textColor" to="/login">Log In</RouterLink></span></div>
        </div>

    </form>
</template>
<script>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores';

export default {
    data(){
        return {
            email:"",
            emailError:"",
            password: "",
            passwordError:"",
            isLoading: false,
        }
    },
    computed: {
        authStore(){
            return useAuthStore();
        }
    },
    watch:{
        password(newVal){
            this.passwordError = newVal.length < 8 ? "Passwordd too short" : "";
        },
        'authStore.error'(newError){
            if(newError){
                this.authError = newError;
                this.authStore.clearError();
            }
        }
    },
    methods:{
        async handleSignup(e){
            e.preventDefault();
            if(!this.email || !this.password){
                this.authError = 'Please fill in all fields'
            }
            this.isLoading = true;
            this.authError = '';

            await this.authStore.signUp(this.email, this.password);

            this.authStore.clearError();
            this.isLoading = false;
        }
    }
}

</script>