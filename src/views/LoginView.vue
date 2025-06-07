<script setup>
import Header from "@/components/layout/Header.vue";
import LoginForm from '@/components/auth/LoginForm.vue';
</script>
<template>
  <main class="main-container bg-backgroundColor min-h-screen text-textColor">
    <Header />
    <div class="flex items-center justify-center h-fit mt-4">
        <LoginForm/>
    </div>
  </main> 
</template>

<script>
export default {
    name: "HomeView",
    components: {
    },
};
</script>
