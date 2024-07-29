<template>
    <div class="footer">
        <button @click="sound">sound</button>
        <button @click="layout">keyboard Layout</button>
        <button @click="difficulty">Difficulty</button>
    </div>
</template>
<script>

export default {
    name:"Footer",
    data(){
    },
    created(){
    },
    methods: {
        sound(){
            window.open("../sound/parameters","sound parameters","left=500,top=100,width=400,height=500");
        }
    }
}
</script>
<style>
.footer{
    position:absolute;
    bottom:0;
    padding:1rem;
    display:flex;
    gap:2rem;
}
</style>
