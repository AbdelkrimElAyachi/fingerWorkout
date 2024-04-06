<template>
    <header class="flex justify-between w-5/6 p-10 text-2xl">
        <div  class="menu" >
            <div class="relative inline-block text-left">
                <div :onclick="handleDropDown">
                    <button type="button" class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-backgroundColor px-3 py-2 text-sm font-semibold text-textColor shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-secondary" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    Themes
                    <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                    </svg>
                    </button>
                </div>

            <!--
                Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
                <div v-if="dropDownOpen" class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-backgroundColor shadow-lg ring-1 ring-secondary ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div class="py-1" role="none">
                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                    <a href="#" @click="hanldeTheme" data-theme="default"  class="text-textColor block px-4 py-2 text-sm hover:bg-secondary" role="menuitem" tabindex="-1" id="menu-item-0">
                        <div class="flex">
                            <div class="rounded-full h-4 w-4 bg-[#0F172A] border-2"></div>
                            <div class="rounded-full h-4 w-4 bg-[#ffffff] border-2"></div>
                            <div class="rounded-full h-4 w-4 bg-[#66FF33] border-2"></div>
                            <div class="rounded-full h-4 w-4 bg-[#31572C] border-2"></div>
                            <div class="rounded-full h-4 w-4 bg-[#FF4F63] border-2"></div>
                            <pre> : default</pre>
                        </div>
                    </a>
                    <a href="#" @click="hanldeTheme" data-theme="light" class="text-textColor block px-4 py-2 text-sm hover:bg-secondary" role="menuitem" tabindex="-1" id="menu-item-1">
                        <div class="flex">
                            <div class="rounded-full h-4 w-4 bg-[#ffffff] border-2"></div>
                            <div class="rounded-full h-4 w-4 bg-[#000000] border-2"></div>
                            <div class="rounded-full h-4 w-4 bg-[#3d85fe] border-2"></div>
                            <div class="rounded-full h-4 w-4 bg-[#d4d4d4] border-2"></div>
                            <div class="rounded-full h-4 w-4 bg-[#ff3333] border-2"></div>
                            <pre> : light</pre>
                        </div>
                    </a>
                    </div>
                </div>
            </div>
        </div>
        <nav class="w-1/3">
            <ul class="flex justify-between w-5/6 font-bold">
                <li class="hover:text-primary hover:border-b-4 border-primary"><RouterLink to="/">
                    <span class="link_text " >Home</span>
                </RouterLink></li>
                <li class="hover:text-primary hover:border-b-4 border-primary"><RouterLink to="/about">
                    <span class="link_text" >About</span>
                </RouterLink></li>
                <li class="hover:text-primary hover:border-b-4 border-primary"><RouterLink to="/contribute">
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
                dropDownOpen:false,
                currentTheme:""
            };
        },
        created(){
            console.log("header created");
            this.currentTheme = document.body.getAttribute("data-theme");
        },
        methods: {
            handleDropDown(){
                this.dropDownOpen  = !this.dropDownOpen;
            },
            hanldeTheme(e){
                this.currentTheme = e.currentTarget.getAttribute("data-theme");
                this.renderTheme();
            },
            renderTheme(){
                document.body.setAttribute("data-theme",this.currentTheme);
            }
        }
    };
</script>


<style scoped>

</style>