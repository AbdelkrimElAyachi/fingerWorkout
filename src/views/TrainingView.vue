<script setup>
    import Header from "../components/Header.vue";
    import Footer from "../components/Footer.vue";
    import Keyboard from "../components/keyboard.vue";
</script>
<template>
    <main class="bg-backgroundColor min-h-screen text-textColor">
        <Header/>
        <div class="mt-16">
            <Keyboard keyboardType="AZERTY" />
        </div>
        <Footer/>
    </main>
</template>
<script>
export default {
    name: "TrainingView",
    components:{
        Keyboard,
    },
    data(){
    }
}
</script>
