<script setup>
  import Header from "./components/Header.vue"
</script>

<template>
  <div class="bg-custom-bg h-screen text-white flex flex-col items-center">
    <Header/>
    <router-view></router-view>
  </div> 
</template>
