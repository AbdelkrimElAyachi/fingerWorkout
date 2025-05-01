<script setup>
    import Header from "@/components/layout/Header.vue";
    import Footer from "@/components/layout/Footer.vue";
    import Test from "@/components/Test.vue";
</script>
<template>
  <main class="main-container bg-backgroundColor min-h-screen text-textColor">
    <Header/>
    <div class="mt-16">
        <Test ref="test" :items="['dog','cat','algorithm','science']"/> 
    </div>
    <Footer/>
  </main> 
</template>

<script>
export default {
    name: "HomeView",
    components: {
      Test
    },
};
</script>
