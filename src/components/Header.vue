<template>
    <header class="flex justify-between w-5/6 p-10 text-2xl">
        <div  class="menu" >
            <i class="bi bi-text-paragraph text-5xl cursor-pointer"></i>
        </div>
        <nav class="w-1/3">
            <ul class="flex justify-between w-5/6">
                <li class=""><RouterLink to="/">
                    <span class="link_text" >Home</span>
                </RouterLink></li>
                <li class=""><RouterLink to="/about">
                    <span class="link_text" >About</span>
                </RouterLink></li>
                <li class=""><RouterLink to="/contribute">
                    <span class="link_text" >Contribute</span>
                </RouterLink></li>
            </ul>
        </nav>
    </header>
</template>

<script>
    export default {
    data() {
        return {
        };
    },
    methods: {
    }
    };
</script>


<style scoped>

</style>