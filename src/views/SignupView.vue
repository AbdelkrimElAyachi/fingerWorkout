<script setup>
import Header from "@/components/layout/Header.vue";
import SingUpForm from '@/components/ui/SingUpForm.vue';
</script>
<template>
  <main class="main-container bg-backgroundColor min-h-screen text-textColor">
    <Header />
    <div class="flex items-center justify-center h-fit mt-4">
        <SingUpForm/>
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
