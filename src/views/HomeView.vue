<script setup>
    import Test from "../components/Test.vue";
</script>
<template>
    <div class="mt-16">
        <Test :Duration="60" :items="items"/>
    </div>
</template>
<script>
export default {
    name: "HomeView",
    components:{
        Test
    },
    data(){
        return {
            items: ["cat","dog","algorithm","science"]
        }
    }
}
</script>