<script setup>
    import Keyboard from "../components/keyboard.vue";
</script>
<template>
    <div class="mt-16">
        <Keyboard keyboardType="AZERTY" />
    </div>
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
