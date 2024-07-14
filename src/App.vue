

<script setup>
    import Header from "./components/Header.vue";
</script>
<template>
  <div class="bg-backgroundColor h-screen text-textColor">
    <Header/>
    <router-view  />
  </div> 
</template>
<script>
export default {
    name: "App",
    components:{
        Header,
    },
    data(){
      return {};
    }
}
</script>
