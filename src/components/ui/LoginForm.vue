<script setup>
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import { RouterLink } from 'vue-router';

</script>
<template>
    <form class="text-textColor h-fit flex flex-col gap-6 p-4 border-4 border-textColor min-w-80">
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
            :error="authError"
            required
        />

        <div class="flex flex-col gap-2 justify-center">
            <BaseButton @click="handleSubmit">Submit</BaseButton>
            <div class="text-secondary">You don't have an account <span><RouterLink class="text-textColor" to="/signup">Sign Up</RouterLink></span></div>
        </div>

    </form>
</template>
<script>

export default {
    data(){
        return {
            username:"",
            password: "",
            authError:"",
        }
    },
    watch:{
        password(newVal){
            this.authError = newVal.length < 8 ? "Passwordd too short" : "";
        }
    }
}

</script>