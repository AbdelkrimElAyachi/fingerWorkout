<script setup>
    import Test from "../components/Test.vue";
    import Keyboard from "../components/keyboard.vue";
</script>
<template>
    <div class="mt-16">
        <Test ref="test" :duration="1" :items="['dog','cat','algorithm','science']"/> 
    </div>
</template>

<script>
export default {
    name: "HomeView",
    components: {
        Test,
        Keyboard,
    },
    unmounted() {
        console.log('HomeView unmounted');
        // Perform any necessary cleanup or state preservation here
    },
    beforeDestroy() {
        console.log("homeview beforeDestroy");
    },
    beforeLeaveRoute() {
        console.log("homeview beforeLeaveRoute");
    },
    data() {
    // Your data properties
    },
};
</script>
