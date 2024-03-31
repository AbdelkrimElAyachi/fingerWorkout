<script setup>
  import Header from "./components/Header.vue"
</script>

<template>
  <div class="bg-backgroundColor h-screen text-textColor flex flex-col items-center">
    <Header/>
    <router-view></router-view>
  </div> 
</template>
