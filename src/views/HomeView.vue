<script setup>
    import Header from "../components/Header.vue";
    import Footer from "../components/Footer.vue";
    import Test from "../components/Test.vue";
    import Keyboard from "../components/keyboard.vue";
</script>
<template>
  <main class="bg-backgroundColor min-h-screen text-textColor">
    <Header/>
    <div class="mt-16">
        <Test ref="test" :duration="1" :items="['dog','cat','algorithm','science']"/> 
    </div>
    <Footer/>
  </main> 
</template>

<script>
export default {
    name: "HomeView",
    components: {
        Test,
        Keyboard,
    },
};
</script>
