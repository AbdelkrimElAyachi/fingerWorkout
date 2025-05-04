<script setup>
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
</script>

<template>
    <form class="text-textColor h-fit flex flex-col gap-6 p-4 border-4 border-textColor min-w-80 rounded-lg">
        <div>
            <h5 class="text-center">Sign Up</h5>
            <hr class="">
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
            placeholder="******"
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
import { RouterLink } from 'vue-router';
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
        },
        router(){
            return useRouter();
        }
    },
    watch:{
        password(newVal){
            this.passwordError = newVal.length < 6 ? "Passwordd too short" : "";
        },
        email(newVal){
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            this.emailError = re.test(newVal) ? "" : "Email invalid";
        },
        'authStore.error'(newError){
            if(newError){
                this.passwordError = newError;
                this.authStore.clearError();
            }
        }
    },
    methods:{
        async handleSignup(e){
            e.preventDefault();
            if(!this.email || !this.password){
                this.passwordError = 'Please fill in all fields'
            }
            this.isLoading = true;
            this.passwordError = '';

            await this.authStore.signUp(this.email, this.password);

            this.isLoading = false;
            this.router.push('/');
        }
    }
}

</script>