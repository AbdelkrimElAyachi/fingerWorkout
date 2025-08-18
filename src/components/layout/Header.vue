<script setup>
import { useAuthStore } from '@/stores';
const authStore = useAuthStore();
</script>

<template>
    <header class="flex justify-between w-5/6 p-10 text-2xl mx-auto">
        <div  class="menu" >
            <div class="relative inline-block text-left">
                <div :onclick="toggleDropDown"  v-click-outside="() => hadnleDropDOwn(false)">
                    <button type="button" class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-backgroundColor px-3 py-2 text-sm font-semibold text-textColor border border-textColor shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-secondary" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    Themes
                    <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                    </svg>
                    </button>
                </div>

                <div v-if="dropDownOpen" class="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-backgroundColor shadow-lg ring-1 ring-secondary ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div class="py-1" role="none">
                    <a href="#" @click="hanldeTheme" data-theme="default"  class="text-textColor block px-4 py-2 text-sm hover:bg-secondary" role="menuitem" tabindex="-1" id="menu-item-0">
                        <div class="flex">
                            <div class="rounded-full h-4 w-4 bg-[#0F172A] border-2"></div>
                            <div class="rounded-full h-4 w-4 bg-[#66FF33] border-2"></div>
                            <pre> : Default</pre>
                        </div>
                    </a>
                    <a href="#" @click="hanldeTheme" data-theme="blue" class="text-textColor block px-4 py-2 text-sm hover:bg-secondary" role="menuitem" tabindex="-1" id="menu-item-1">
                        <div class="flex">
                            <div class="rounded-full h-4 w-4 bg-[#0F172A] border-2"></div>
                            <div class="rounded-full h-4 w-4 bg-[#3d85fe] border-2"></div>
                            <pre> : Blue</pre>
                        </div>
                    </a>
                    <a href="#" @click="hanldeTheme" data-theme="pink" class="text-textColor block px-4 py-2 text-sm hover:bg-secondary" role="menuitem" tabindex="-1" id="menu-item-1">
                        <div class="flex">
                            <div class="rounded-full h-4 w-4 bg-[#0F172A] border-2"></div>
                            <div class="rounded-full h-4 w-4 bg-[#fe3dd4] border-2"></div>
                            <pre> : Pink</pre>
                        </div>
                    </a>
                    </div>
                </div>
            </div>
        </div>
        <nav class="w-fit">
            <ul class="flex items-end w-fit gap-6 font-bold text-xl">
                <li class="hover:text-primary hover:border-b-4 border-primary">
                    <RouterLink to="/">
                        <span class="link_text " >Home</span>
                    </RouterLink>
                </li>
                <li v-if="!authStore.isAuthenticated" class="hover:text-primary hover:border-b-4 border-primary">
                    <RouterLink to="/login">
                        <span class="link_text" >Log In</span>
                    </RouterLink>
                </li>
                <li v-else class="hover:text-primary hover:border-b-4 border-primary">
                    <RouterLink to="/profile">
                        <button class="link_text" >Profile</button>
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>

export default {
    data() {
        return {
            dropDownOpen:false,
        };
    },
    async created(){
        if(!localStorage.getItem('data-theme')) localStorage.setItem('data-theme','default');
        this.renderTheme();
    },
    methods: {
        toggleDropDown(){
            this.dropDownOpen  = !this.dropDownOpen;
        },
        hadnleDropDOwn(closeOrOpen){
            this.dropDownOpen = closeOrOpen;
        },
        hanldeTheme(e){
            localStorage.setItem('data-theme', e.currentTarget.getAttribute("data-theme"));
            this.renderTheme();
        },
        renderTheme(){
            const currentTheme = localStorage.getItem('data-theme');
            document.getElementById('app').setAttribute("data-theme",currentTheme);
        },
    }
    };
</script>
<style scoped>

</style>
